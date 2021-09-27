import React, { Suspense } from 'react';
import ErrorBoundary from './ErrorBoundary';
import { ButtonComponent } from './SettingComponents/Settings';
import { fetchNui } from '../utils/fetchNui';

const MenuData = {
  huutis: true,
  settings: [
    {
      name: 'Send message',
      components: [
        {
          type: 'TextField',
          default: 'Bruh',
          text: 'Testia field 1',
          id: 'text',
        },
        {
          type: 'TextField',
          default: 'Duh',
          text: 'Testia field 2',
          id: 'text2',
        },
        {
          type: 'Button',
          text: 'Testia',
          buttonText: 'YEP',
          id: 'nappi',
          variant: 'red',
        },
        {
          type: 'Button',
          text: 'Noclip',
          buttonText: 'Toggle',
          id: 'nappula',
          event: 'toggleNoclip',
        },
      ],
    },
  ],
};

interface ComponentState extends ButtonComponent {
  default: string
}

interface MyState {
  componentStates: ComponentState | null
}

class SettingsMenuBuilder extends React.Component<any, MyState> {
  constructor(props: any) {
    super(props);

    this.state = {
      componentStates: null,
    };
  }

  handleComponentState(state: any, id: string) {
    console.log('STATEEE', state);

    const { componentStates } = this.state;
    const newState = { ...componentStates };

    let compState = (newState as any)[id];

    compState = {
      ...compState,
      ...state,
    };

    this.setState({
      componentStates: {
        ...componentStates,
        [id]: compState,
      } as any,
    });

    console.log(this.state);
  }

  async handleClick(e: ButtonComponent) {
    console.log('HERE');

    if (e.event) {
      await fetchNui(e.event);
    }
  }

  loadComponent(name: string) {
    return React.lazy(() => import(`./SettingComponents/${name}.tsx`));
  }

  render() {
    const { componentStates } = this.state;

    return (
      <ErrorBoundary>
        <div>
          {MenuData.settings.map((setting) => (
            <div key={setting.name}>
              <span>{setting.name}</span>
              {(setting.components || []).map((Component, i: number) => {
                const RenderComponent = this.loadComponent(Component.type);

                return (
                  <span key={i}>
                    <span>{Component.type}</span>
                    <span>{Component.default}</span>
                    <Suspense fallback={<div>Loading...</div>}>
                      <RenderComponent
                        componentState={componentStates && (componentStates as any)[Component.id]}
                        handleComponentState={this.handleComponentState.bind(this)}
                        clickHandler={this.handleClick.bind(this)}
                        data={Component}
                      />
                    </Suspense>
                  </span>
                );
              })}
            </div>
          ))}
        </div>
      </ErrorBoundary>
    );
  }
}

export default SettingsMenuBuilder;
