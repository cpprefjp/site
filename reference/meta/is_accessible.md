# is_accessible
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval bool is_accessible(info r, access_context ctx);
}
```
* info[link info.md]
* access_context[link access_context.md]

## 概要
指定したアクセスコンテキストでアクセス可能かを判定する。

任意のリフレクションを受け取れる。クラスメンバや直接基底クラス関係以外のリフレクション（型や名前空間など）に対しては常に`true`を返す。


## 戻り値
`r`がクラスメンバまたは直接基底クラス関係を表す場合、アクセスコンテキスト`ctx`でアクセス可能であれば`true`を返す。それ以外のリフレクションに対しては`true`を返す。


## 例外
`r`がクラスメンバを表し、そのメンバの親クラスが不完全な場合、または不完全な派生クラスを含む基底クラス関係を表す場合、[`std::meta::exception`](exception.md)例外を送出する。


## 例
```cpp example
#include <meta>

class C {
  int secret;
public:
  int visible;
};

consteval bool check() {
  auto members = std::meta::nonstatic_data_members_of(
      ^^C, std::meta::access_context::unchecked());
  auto ctx = std::meta::access_context::unprivileged();
  return !std::meta::is_accessible(members[0], ctx)  // secret: private
      && std::meta::is_accessible(members[1], ctx);  // visible: public
}

int main() {
  static_assert(check());
}
```
* std::meta::nonstatic_data_members_of[link nonstatic_data_members_of.md]
* std::meta::access_context[link access_context.md]
* unchecked[link access_context/unchecked.md]
* unprivileged[link access_context/unprivileged.md]

### 出力
```
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 16 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
