# is_modulo
* limits[meta header]
* std[meta namespace]
* numeric_limits[meta class]
* variable[meta id-type]

```cpp
// C++03
static const bool is_modulo;

// C++11
static constexpr bool is_modulo;
```

## 概要
加算 (`+`) ・減算 (`-`) ・乗算 (`*`) における数�的な値と、その型での値との間に (`max() - min() + 1`) を法として常に合同関係があるかを判定する。

この性質を持つ型は、オーバーフ�ー時に最大値+1で剰余した値となる。

符号なし整数型の場合は常に`true`となる。

- C++03 : 多くのマシンでは、浮動小数点数型の場合は`false`に、符号付き整数型の場合は`true`になる
- C++17 : 標準では符号付き整数型は`false`となる。標準の拡張として実装の符号あり整数型が、未定義動作としてではなく�しくオーバーフ�ーする場合、`true`と定義される


## 備考
- C++03の「ほとんどのマシンでは符号付き整数型は`true`になる」という仕様は、符号あり整数型の未定義動作としてのオーバーフ�ー動作を�しいものとして扱ってしまっていた。これは間違いであった。C++17では、符号あり整数型は標準では`false`とし、実装がオーバーフ�ー時に値を折り返す場合に`true`と定義されるように修�された
- コンパイルオプション
    - GCCとClangでは、`-fwrapv`オプションをつけることで、符号付き整数型を2の補数表現として折り返すよう動作を規定する
    - Visual C++では、`d2UndefIntOverflow`オプションをつけることで、符号付き整数型のオーバーフ�ーを利用するコードの最適化を無効化し、値を折り返す動作になる


## 例
```cpp example
#include <iostream>
#include <cassert>
#include <limits>

int main()
{
  std::cout << std::boolalpha;
  std::cout << "int : " << std::numeric_limits<int>::is_modulo << std::endl;
  std::cout << "unsigned int : " << std::numeric_limits<unsigned int>::is_modulo << std::endl;
  std::cout << "float : " << std::numeric_limits<float>::is_modulo << std::endl;
  std::cout << "char : " << std::numeric_limits<char>::is_modulo << std::endl;
  std::cout << "char : " << std::numeric_limits<bool>::is_modulo << std::endl;

  assert(std::numeric_limits<unsigned int>::max() + 1 == 0u);
}
```
* is_modulo[color ff0000]
* max()[link max.md]

### 出力例
```
int : false
unsigned int : true
float : false
char : false
char : false
```


## 参照
- [LWG Issue 612. `numeric_limits::is_modulo` insufficiently defined](https://wg21.cmeerw.net/lwg/issue612)
    - C++11で、定義がより明確になった
- [LWG 2422. `std::numeric_limits<T>::is_modulo` description: "most machines" errata](https://wg21.cmeerw.net/lwg/issue2422)
