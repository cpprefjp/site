# current_class
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval info current_class();
}
```
* info[link info.md]

## 概要
`current_class()`を呼び出した時点で直接囲んでいるクラス（またはメンバ関数の所属するクラス）のリフレクションを返す。


## 戻り値
呼び出し位置を囲んでいるクラスのリフレクションを返す。メンバ関数内から呼ばれた場合は、そのメンバ関数が所属するクラスのリフレクションを返す。


## 例外
クラス（またはメンバ関数）の文脈で呼ばれていない場合、[`std::meta::exception`](exception.md)例外を送出する。


## 例
```cpp example
#include <meta>
#include <print>

class MyClass {
public:
  static void info() {
    constexpr auto cls = std::meta::current_class();
    std::println("クラス名: {}", std::meta::identifier_of(cls));
  }
};

int main() {
  MyClass::info();
}
```
* std::meta::current_class[color ff0000]
* std::meta::identifier_of[link identifier_of.md]

#### 出力例
```
クラス名: MyClass
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 16 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`current_function`](current_function.md)
- [`current_namespace`](current_namespace.md)


## 参照
- [P3795R2 Miscellaneous Reflection Cleanup](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3795r2.html)
