export interface NavigationItem {
  id: string;
  title: string;
  type: 'item' | 'collapse' | 'group';
  translate?: string;
  icon?: string;
  hidden?: boolean;
  url?: string;
  classes?: string;
  groupClasses?: string;
  exactMatch?: boolean;
  external?: boolean;
  target?: boolean;
  breadcrumbs?: boolean;
  children?: NavigationItem[];
  link?: string;
  description?: string;
  path?: string;
}

export const NavigationItems: NavigationItem[] = [
  {
    id: 'dashboard',
    title: 'Dashboard',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'default',
        title: 'Default',
        type: 'item',
        classes: 'nav-item',
        url: '/dashboard/default',
        icon: 'dashboard',
        breadcrumbs: false
      }
    ]
  },
  /* {
    id: 'authentication',
    title: 'Authentication',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'login',
        title: 'Login',
        type: 'item',
        classes: 'nav-item',
        url: '/login',
        icon: 'login',
        target: true,
        breadcrumbs: false
      },
      {
        id: 'register',
        title: 'Register',
        type: 'item',
        classes: 'nav-item',
        url: '/register',
        icon: 'profile',
        target: true,
        breadcrumbs: false
      }
    ]
  },*/
  {
    id: 'Componentes',
    title: 'Componentes',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'proveedores',
        title: 'Proveedores',
        type: 'item',
        classes: 'nav-item',
        url: '/proveedores',
        icon: ''
      },
      {
        id: 'color',
        title: 'Clientes',
        type: 'item',
        classes: 'nav-item',
        url: '/clientes',
        icon: 'ant-design'
      },
      {
        id: 'menus',
        title: 'Menus',
        type: 'item',
        classes: 'nav-item',
        url: '/menus',
        icon: 'ant-design'
      },
      {
        id: 'ordenes',
        title: 'Ordenes',
        type: 'item',
        classes: 'nav-item',
        url: '/ordenes',
        icon: 'ant-design'
      }, //
      {
        id: 'reportes',
        title: 'Reportes',
        type: 'item',
        classes: 'nav-item',
        url: '/reportes',
        icon: 'ant-design'
      },
    ]
  },

  {
    id: 'other',
    title: 'Other',
    type: 'group',
    icon: 'icon-navigation',
    children: [
      {
        id: 'sample-page',
        title: 'Sample Page',
        type: 'item',
        url: '/sample-page',
        classes: 'nav-item',
        icon: 'chrome'
      },
      {
        id: 'document',
        title: 'Document',
        type: 'item',
        classes: 'nav-item',
        url: 'https://codedthemes.gitbook.io/mantis-angular/',
        icon: 'question',
        target: true,
        external: true
      }
    ]
  }
];
