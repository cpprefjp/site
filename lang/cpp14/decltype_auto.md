# decltype(auto)
* cpp14[meta cpp]

## 概要
`decltype(auto)`は、`decltype`に与える式を右辺の式で置き換えて型推論する機能である。

```cpp
int a = 3;
int b = 2;

decltype(a + b) c = a + b; // cの型はint
decltype(auto)  d = a + b; // dの型もint。autoが式「a + b」で置き換えられる
```


参照の変数を`auto`キーワードで型推論した場合は`T`となるが、`decltype(auto)`で型推論した場合は`T&`となる。

```cpp
int x = 3;
int& r = x;

auto           a = r; // aの型はint
decltype(r)    b = r; // bの型はint&
decltype(auto) c = r; // cの型はint&
```

この機能は、[通常関数の戻り値型推論](return_type_deduction_for_normal_functions.md)の戻り値型プレースホルダーとしても使用できる：

```cpp
// autoの場合はintが戻り値型となるが、
// decltype(auto)とすることでint&が戻り値型となる。
decltype(auto) f(int& r)
{
  return r;
}
```


## 例
```cpp example
#include <type_traits>

int main()
{
  int x = 3;
  int& r = x;

  auto           a = r; // aの型はint
  decltype(r)    b = r; // bの型はint&
  decltype(auto) c = r; // cの型はint&

  static_assert(std::is_same<decltype(a), int>::value, "");
  static_assert(std::is_same<decltype(b), int&>::value, "");
  static_assert(std::is_same<decltype(c), int&>::value, "");
}
```

## 出力
```
```


## この機能が必要になった背景・経緯
`decltype(auto)`は、C++14で導入された「[通常関数の戻り値型推論](return_type_deduction_for_normal_functions.md)」の機能で、参照の変数を参照のまま`return`文で返せるようにするために導入された。


## 関連項目
- [C++14 通常関数の戻り値型推論](return_type_deduction_for_normal_functions.md)

