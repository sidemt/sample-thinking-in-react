const PRODUCTS = [
  {category: "Sporting Goods", price: "$49.99", stocked: true, name: "Football"},
  {category: "Sporting Goods", price: "$9.99", stocked: true, name: "Baseball"},
  {category: "Sporting Goods", price: "$29.99", stocked: false, name: "Basketball"},
  {category: "Electronics", price: "$99.99", stocked: true, name: "iPod Touch"},
  {category: "Electronics", price: "$399.99", stocked: false, name: "iPhone 5"},
  {category: "Electronics", price: "$199.99", stocked: true, name: "Nexus 7"}
];

class FilterableProductTable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filterText: '',
      inStockOnly: false
    }

    this.handleInputChange = this.handleInputChange.bind(this);
  }

  handleInputChange(e) {
   const target = e.target;
   const value = target.name === 'inStockOnly' ? target.checked : target.value;
   const name = target.name;

   this.setState({
     [name]: value
   });
  }

  render() {
    return (
      <div>
        <SearchBar
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly}
          onChange={this.handleInputChange} />
        <ProductTable
          products={this.props.products}
          filterText={this.state.filterText}
          inStockOnly={this.state.inStockOnly} />
      </div>
    );
  }
}

class SearchBar extends React.Component {

  render() {
    return (
      <form>
        <div>
          <input
            type="text"
            name="filterText"
            placeholder="Search..."
            value={this.props.filterText}
            onChange={this.props.onChange} />
        </div>
        <div>
          <input
            type="checkbox"
            id="inStockOnly"
            name="inStockOnly"
            value={this.props.inStockOnly}
            onChange={this.props.onChange} />
          <label htmlFor="inStockOnly">Only show products in stock</label>
        </div>
      </form>
    );
  }
}

class ProductTable extends React.Component {

  render() {

    function filterProducts(productsArr, filterText, inStockOnly) {
      let results = productsArr.filter(product => {
        return product.name.includes(filterText);
      });
      if (inStockOnly) {
        results = results.filter(product => {
          return product.stocked
        });
      }
      return results;
    }

    function groupByCategory(productsArr) {
      return productsArr.reduce(function(accumlator, currentValue) {
        // acummlator objectに現在のcategoryがすでに存在すればその配列を取得、存在しなければ空の配列を作成
        accumlator[currentValue.category] = accumlator[currentValue.category] || [];
        // 配列にcurrentValueを追加
        accumlator[currentValue.category].push(currentValue);
        return accumlator;
      }, {})
    }

    const filteredProducts = filterProducts(this.props.products, this.props.filterText, this.props.inStockOnly)
    const groupedProducts = groupByCategory(filteredProducts);
    const categories = Object.keys(groupedProducts);

    const rows = [];
    categories.forEach(category => {
      rows.push(<ProductCategoryRow key={category} category={category} />)

      groupedProducts[category].forEach((product) => {
        rows.push(<ProductRow key={product.name} product={product} />)
      });
    });
    console.log(rows);

    return(
      <table>
        <thead>
          <tr>
            <th>Name</th>
            <th>Price</th>
          </tr>
        </thead>

        <tbody>
          {rows}
        </tbody>
      </table>
    );
  }
}

class ProductCategoryRow extends React.Component {
  render() {
    return (
      <tr>
        <td className="categoryRow" colSpan="2">{this.props.category}</td>
      </tr>
    );
  }
}

class ProductRow extends React.Component {
  render() {
    return (
      <tr>
        <td>{this.props.product.name}</td>
        <td>{this.props.product.price}</td>
      </tr>
    );
  }
}

ReactDOM.render(
  <FilterableProductTable products={PRODUCTS} />,
  document.getElementById("app")
);
