# 構造化束縛がカスタマイゼーションポイントを見つけるルールを緩和
* cpp20[meta cpp]

## 概要
C++17までは、構造化束縛する対象の型が`get()`メンバ関数を持っていればその関数でメンバ変数を抽出し、持っていなければ非メンバ関数の`get()`関数で抽出する仕様となっていた。

この仕様の問題として、非型テンプレートを持たない`get()`メンバ関数を持つ型を構造化束縛の対象とすると、不適格なプ�グラムになってしまっていた。例として、[`std::shared_ptr`](/reference/memory/shared_ptr.md)クラスは、生ポインタを取得するためのメンバ関数として[`get()`](/reference/memory/shared_ptr/get.md)を持つが、これは構造化束縛では使用できない。

この問題を解決するため、C++20では、構造化束縛する対象の型が「** 非型テンプレートパラメータを持つ** `get()`メンバ関数を持っていればその関数でメンバ変数を抽出し、持っていなければ非メンバ関数の`get()`関数で抽出する」という仕様に改訂となる。

これによって、[`std::shared_ptr`](/reference/memory/shared_ptr.md)のような非型テンプレートパラメータを持たない`get()`メンバ関数を持つ型に対して、カスタムの構造化束縛動作を、非メンバ関数の`get()`によって定義できるようになる。


## 例
```cpp example
#include <memory>
#include <tuple>
#include <string>

struct X : private std::shared_ptr<int> {
  std::string fun_payload;
};

template<int N> std::string& get(X& x) {
  if constexpr(N==0) return x.fun_payload;
}

namespace std {
  template<> struct tuple_size<X> : public std::integral_constant<int, 1> {};
  template<> struct tuple_element<0, X> {
    using type = std::string;
  };
}

int main()
{
  X x;
  auto& [y] = x; // C++17では、get()メンバ関数が優先されるため、コンパイルエラーとなる
                 // C++20ではOK
}
```
* std::integral_constant[link /reference/type_traits/integral_constant.md]
* tuple_size[link /reference/tuple/tuple_size.md]
* tuple_element[link /reference/tuple/tuple_element.md]

### 出力
```
```


## 関連項目
- [C++17 構造化束縛](/lang/cpp17/structured_bindings.md)


## 参照
- [P0961R1 Relaxing the structured bindings customization point finding rules](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0961r1.html)
