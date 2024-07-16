# 宣言時のメンバ初期化を持つ型の集成体初期化を許可
* cpp14[meta cpp]

<!-- start lang caution -->

このページはC++14に採用された言語機能の変更を解説しています。

のちのC++規格でさらに変更される場合があるため[関連項目](#relative-page)を参照してください。

<!-- last lang caution -->

## 概要
C++11で導入された[メンバ初期化子](/lang/cpp11/non_static_data_member_initializers.md)は集成体の初期化と組み合わせて使用することができない問題があった。

C++11で不適格となる以下のコードは、C++14では適格となる：

```cpp
#include <string>

struct Univ {
  std::string name;
  int rank;
  std::string city = "unknown";
};

int main()
{
  Univ u = {"Columbia", 10};             // OK: city=="unknown"
  Univ v = {"Columbia", 10, "New York"}; // OK
}
```


## 仕様
- 集成体の定義として「非静的メンバ変数の初期化をもたない」ことが条件になっていたが、それを削除


## <a id="relative-page" href="#relative-page">関連項目</a>
- [C++11 非静的メンバ変数の初期化](/lang/cpp11/non_static_data_member_initializers.md)

## 参照
- [N3653 - Member initializers and aggregates](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3653.html)