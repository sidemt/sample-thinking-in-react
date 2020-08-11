var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var PRODUCTS = [{ category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football" }, { category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball" }, { category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball" }, { category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch" }, { category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5" }, { category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7" }];

var FilterableProductTable = function (_React$Component) {
  _inherits(FilterableProductTable, _React$Component);

  function FilterableProductTable(props) {
    _classCallCheck(this, FilterableProductTable);

    var _this = _possibleConstructorReturn(this, (FilterableProductTable.__proto__ || Object.getPrototypeOf(FilterableProductTable)).call(this, props));

    _this.state = {
      filterText: '',
      inStockOnly: false
    };

    _this.handleInputChange = _this.handleInputChange.bind(_this);
    return _this;
  }

  _createClass(FilterableProductTable, [{
    key: "handleInputChange",
    value: function handleInputChange(e) {
      var target = e.target;
      var value = target.name === 'inStockOnly' ? target.checked : target.value;
      var name = target.name;

      this.setState(_defineProperty({}, name, value));
    }
  }, {
    key: "render",
    value: function render() {
      return React.createElement(
        "div",
        null,
        React.createElement(SearchBar, {
          filterText: this.state.filterText,
          inStockOnly: this.state.inStockOnly,
          onChange: this.handleInputChange }),
        React.createElement(ProductTable, {
          products: this.props.products,
          filterText: this.state.filterText,
          inStockOnly: this.state.inStockOnly })
      );
    }
  }]);

  return FilterableProductTable;
}(React.Component);

var SearchBar = function (_React$Component2) {
  _inherits(SearchBar, _React$Component2);

  function SearchBar() {
    _classCallCheck(this, SearchBar);

    return _possibleConstructorReturn(this, (SearchBar.__proto__ || Object.getPrototypeOf(SearchBar)).apply(this, arguments));
  }

  _createClass(SearchBar, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "form",
        null,
        React.createElement(
          "div",
          null,
          React.createElement("input", {
            type: "text",
            name: "filterText",
            placeholder: "Search...",
            value: this.props.filterText,
            onChange: this.props.onChange })
        ),
        React.createElement(
          "div",
          null,
          React.createElement("input", {
            type: "checkbox",
            id: "inStockOnly",
            name: "inStockOnly",
            value: this.props.inStockOnly,
            onChange: this.props.onChange }),
          React.createElement(
            "label",
            { htmlFor: "inStockOnly" },
            "Only show products in stock"
          )
        )
      );
    }
  }]);

  return SearchBar;
}(React.Component);

var ProductTable = function (_React$Component3) {
  _inherits(ProductTable, _React$Component3);

  function ProductTable() {
    _classCallCheck(this, ProductTable);

    return _possibleConstructorReturn(this, (ProductTable.__proto__ || Object.getPrototypeOf(ProductTable)).apply(this, arguments));
  }

  _createClass(ProductTable, [{
    key: "render",
    value: function render() {

      function filterProducts(productsArr, filterText, inStockOnly) {
        var results = productsArr.filter(function (product) {
          return product.name.includes(filterText);
        });
        if (inStockOnly) {
          results = results.filter(function (product) {
            return product.stocked;
          });
        }
        return results;
      }

      function groupByCategory(productsArr) {
        return productsArr.reduce(function (accumlator, currentValue) {
          // acummlator objectに現在のcategoryがすでに存在すればその配列を取得、存在しなければ空の配列を作成
          accumlator[currentValue.category] = accumlator[currentValue.category] || [];
          // 配列にcurrentValueを追加
          accumlator[currentValue.category].push(currentValue);
          return accumlator;
        }, {});
      }

      var filteredProducts = filterProducts(this.props.products, this.props.filterText, this.props.inStockOnly);
      var groupedProducts = groupByCategory(filteredProducts);
      var categories = Object.keys(groupedProducts);

      var rows = [];
      categories.forEach(function (category) {
        rows.push(React.createElement(ProductCategoryRow, { key: category, category: category }));

        groupedProducts[category].forEach(function (product) {
          rows.push(React.createElement(ProductRow, { key: product.name, product: product }));
        });
      });
      console.log(rows);

      return React.createElement(
        "table",
        null,
        React.createElement(
          "thead",
          null,
          React.createElement(
            "tr",
            null,
            React.createElement(
              "th",
              null,
              "Name"
            ),
            React.createElement(
              "th",
              null,
              "Price"
            )
          )
        ),
        React.createElement(
          "tbody",
          null,
          rows
        )
      );
    }
  }]);

  return ProductTable;
}(React.Component);

var ProductCategoryRow = function (_React$Component4) {
  _inherits(ProductCategoryRow, _React$Component4);

  function ProductCategoryRow() {
    _classCallCheck(this, ProductCategoryRow);

    return _possibleConstructorReturn(this, (ProductCategoryRow.__proto__ || Object.getPrototypeOf(ProductCategoryRow)).apply(this, arguments));
  }

  _createClass(ProductCategoryRow, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "tr",
        null,
        React.createElement(
          "td",
          { className: "categoryRow", colSpan: "2" },
          this.props.category
        )
      );
    }
  }]);

  return ProductCategoryRow;
}(React.Component);

var ProductRow = function (_React$Component5) {
  _inherits(ProductRow, _React$Component5);

  function ProductRow() {
    _classCallCheck(this, ProductRow);

    return _possibleConstructorReturn(this, (ProductRow.__proto__ || Object.getPrototypeOf(ProductRow)).apply(this, arguments));
  }

  _createClass(ProductRow, [{
    key: "render",
    value: function render() {
      return React.createElement(
        "tr",
        null,
        React.createElement(
          "td",
          null,
          this.props.product.name
        ),
        React.createElement(
          "td",
          null,
          this.props.product.price
        )
      );
    }
  }]);

  return ProductRow;
}(React.Component);

ReactDOM.render(React.createElement(FilterableProductTable, { products: PRODUCTS }), document.getElementById("app"));