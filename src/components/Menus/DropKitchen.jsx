import React from 'react';
import { Link } from 'react-router-dom';

const DropKitchen = () => {
  const menuSections = [
    {
      title: "Kitchens & Appliances",
      columns: [
        {
          title: "Kitchen Appliances",
          items: [
            "Mixer Grinders", "Juicers", "Hand Blenders", "Food Processors", 
            "Oven Toaster Grills", "Toaster", "Rice & Pasta Cookers", "Deep Fryers",
            "Hand Mixers", "Coffee Machines", "Wet Grinders", "Induction Cooktops",
            "Sandwich Makers", "Electric Kettles"
          ]
        },
        {
          title: "Home Appliances",
          items: [
            "Water Purifiers", "Irons", "Sewing Machines & Accessories", 
            "Vacuum Cleaners", "Inverters"
          ]
        },
        {
          title: "Heating, Cooling & Air Quality",
          items: [
            "Fans", "Water Heaters", "Air Coolers", "Air Purifiers", 
            "Dehumidifiers", "Humidifiers"
          ]
        }
      ]
    },
    {
      title: "Large Appliances",
      columns: [
        {
          title: "Air Conditioners",
          items: ["Split ACs", "Window ACs", "Inverter ACs"]
        },
        {
          title: "Refrigerators",
          items: ["Single Door", "Double Door", "Triple Door", "Side By Side"]
        },
        {
          title: "Washing Machines",
          items: [
            "Fully Automatic Front Load", "Fully Automatic Top Load", 
            "Semi Automatic Top Load", "Dryers"
          ]
        },
        {
          title: "Other Appliances",
          items: ["Microwave Ovens", "Dishwashers", "Chimneys"],
          subItems: {
            "Microwave Ovens": ["Solo", "Convection", "Grill"]
          }
        }
      ]
    },
    {
      title: "Brands & Guides",
      columns: [
        {
          title: "Shop By Brand",
          items: [
            "Philips", "Bajaj", "Prestige", "Usha", "Butterfly", "Kent",
            "Orpat", "Symphony", "Preethi", "Havells", "Morphy Richards",
            "Crompton", "Wonderchef", "Pigeon"
          ]
        },
        {
          title: "Shop by brand",
          items: ["LG", "Voltas", "Carrier", "Blue Star", "BPL", "Samsung"]
        },
        {
          title: "Shop by brand",
          items: [
            "Samsung", "LG", "Whirlpool", "Godrej", "Mitashi", "BPL",
            "Haier", "Bosch"
          ]
        }
      ]
    },
    {
      title: "Guides & Offers",
      columns: [
        { title: "Recipe Corner", items: ["See more"], highlight: true },
        { title: "Fans Buying Guide", items: ["Learn more"], highlight: true },
        { title: "Coolers Buying Guide", items: ["Learn more"], highlight: true },
        { title: "No Cost EMI", items: ["Learn more"], highlight: true },
        { title: "7 reasons to buy from us", items: ["Learn more"], highlight: true },
        { title: "Refrigerators", items: ["Learn more"], highlight: true }
      ]
    }
  ];

  return (
    <div className="w-full max-w-7xl bg-white border border-gray-200 rounded-lg shadow-xl z-[60]">
      <div className="p-6 max-h-[80vh] overflow-y-auto">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {menuSections.map((section, sectionIndex) => (
            <div key={sectionIndex} className="space-y-4">
              <h3 className="text-base font-bold text-gray-900 border-b border-gray-200 pb-2">
                {section.title}
              </h3>
              <div className="space-y-4">
                {section.columns.map((column, columnIndex) => (
                  <div key={columnIndex} className="pb-2">
                    <h4 className="text-xs font-semibold text-gray-800 mb-2 uppercase tracking-wide">
                      {column.title}
                    </h4>
                    <ul className="space-y-1">
                      {column.items.map((item, itemIndex) => (
                        <li key={itemIndex}>
                          {column.subItems && column.subItems[item] ? (
                            <div className="mb-1">
                              <span className={`block py-1 text-xs text-gray-600 cursor-default ${
                                column.highlight 
                                  ? 'text-blue-600 font-medium' 
                                  : 'text-gray-600'
                              }`}>
                                {item}
                              </span>
                              <ul className="ml-3 mt-1 space-y-0.5 border-l border-gray-200 pl-3">
                                {column.subItems[item].map((subItem, subIndex) => (
                                  <li key={subIndex}>
                                    <Link 
                                      to="#" 
                                      className="block py-0.5 text-xs text-gray-500 hover:text-orange-600 hover:underline transition-colors"
                                    >
                                      {subItem}
                                    </Link>
                                  </li>
                                ))}
                              </ul>
                            </div>
                          ) : (
                            <Link 
                              to="#"
                              className={`block py-1 text-xs hover:text-orange-600 transition-colors ${
                                column.highlight 
                                  ? 'text-blue-600 hover:underline font-medium' 
                                  : 'text-gray-600 hover:text-orange-600'
                              }`}
                            >
                              {item}
                            </Link>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Featured Brands Banner */}
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-4">
              <span className="text-sm font-semibold text-gray-700 whitespace-nowrap">Popular Brands:</span>
              <div className="flex flex-wrap gap-3">
                {["Samsung", "LG", "Whirlpool", "Philips", "Prestige", "Bajaj"].map((brand, index) => (
                  <Link 
                    key={index}
                    to="#" 
                    className="text-xs text-blue-600 hover:text-orange-700 hover:underline whitespace-nowrap"
                  >
                    {brand}
                  </Link>
                ))}
              </div>
            </div>
            <Link to="#" className="text-sm text-blue-600 hover:text-orange-700 hover:underline font-medium whitespace-nowrap">
              View All Brands →
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DropKitchen;