const { getDefaultConfig } = require('expo/metro-config');
const path = require('path');

// Encontrar la raíz del monorepo
const projectRoot = __dirname;
const workspaceRoot = path.resolve(projectRoot, '../..');

const config = getDefaultConfig(projectRoot);

// 1. Configurar Metro para observar la raíz del monorepo
config.watchFolders = [workspaceRoot];

// 2. Priorizar módulos locales antes que los de la raíz si hay duplicados
config.resolver.nodeModulesPaths = [
    path.resolve(projectRoot, 'node_modules'),
    path.resolve(workspaceRoot, 'node_modules'),
];

// 3. Resolución para paquetes compartidos
config.resolver.disableHierarchicalLookup = true;

module.exports = config;
