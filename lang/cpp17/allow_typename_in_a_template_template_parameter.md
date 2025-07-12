# テンプレートテンプレートパラメータにtypenameキーワードの使用を許可 [N4051]
* cpp17[meta cpp]

<!-- start lang caution -->

このページはC++17に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
テンプレートパラメータはほとんどの箇所で`class`キーワードと`typename`キーワードの両方を使用できたが、テンプレートテンプレートパラメータのクラステンプレート部分については`class`キーワードしか使用できなかった。

```cpp
// `class X`部分については、typenameを使用できなかった
template <template <typename... Args> class X>
class Y;
```

C++17では、テンプレートテンプレートパラメータでも`typename`キーワードを使用できることとなった。

```cpp
// `typename X`と書けるようになった
template <template <typename... Args> typename X>
class Y;
```


## 例
```cpp example
#include <vector>

template <template <typename...> typename Container>
class X {
  // コンテナのクラステンプレートをテンプレートパラメータで受け取って、
  // 要素型はあとで指定する。
  Container<int> c_;
public:
  void add(int x)
  {
    c_.push_back(x);
  }
};

int main()
{
  X<std::vector> x;
  x.add(3);
  x.add(1);
  x.add(4);
}
```

## 参照
- [N4051 Allow `typename` in a template template parameter](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n4051.html)
