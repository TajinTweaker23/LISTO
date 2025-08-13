import React from 'react';
import { Dialog, Combobox } from '@headlessui/react';

type CommandPaletteProps = {
  isOpen: boolean;
  onClose: () => void;
  actions: { name: string; action: () => void }[];
  query: string;
  setQuery: (query: string) => void;
};

const CommandPalette: React.FC<CommandPaletteProps> = ({ isOpen, onClose, actions, query, setQuery }) => {
  const filteredActions = actions.filter((a) =>
    a.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <Dialog
      open={isOpen}
      onClose={onClose}
      className="fixed inset-0 z-50 flex items-center justify-center"
    >
      <div
        className="fixed inset-0 bg-black/60 backdrop-blur-sm"
        aria-hidden="true"
      />
      <div className="relative bg-white dark:bg-[#1a1b23] rounded-2xl shadow-2xl p-7 w-full max-w-xl mx-auto border border-sky-400/20">
        <Combobox
          value={null}
          onChange={(a: any) => {
            a.action();
            onClose();
          }}
        >
          <Combobox.Input
            className="w-full p-3 border-none rounded-xl mb-4 bg-gray-100 dark:bg-gray-700 focus:ring-2 focus:ring-blue-400 text-gray-800 dark:text-gray-100 outline-none text-lg"
            placeholder="Type a command..."
            onChange={(e) => setQuery(e.target.value)}
            autoFocus
          />
          <Combobox.Options className="max-h-60 overflow-auto">
            {filteredActions.map((a) => (
              <Combobox.Option
                key={`action-${a.name}`}
                value={a}
                className="p-3 rounded-lg hover:bg-sky-100 dark:hover:bg-sky-900 cursor-pointer transition"
              >
                {a.name}
              </Combobox.Option>
            ))}
          </Combobox.Options>
        </Combobox>
      </div>
    </Dialog>
  );
};

export default CommandPalette;
