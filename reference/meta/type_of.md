# type_of
* meta[meta header]
* std::meta[meta namespace]
* function[meta id-type]
* cpp26[meta cpp]

```cpp
namespace std::meta {
  consteval info type_of(info r);
}
```
* info[link info.md]

## 概要
リフレクションが表すエンティティの型のリフレクションを取得する。

以下のいずれかを表すリフレクションを受け取れる：

- 値、オブジェクト、変数、または関数（未推論のプレースホルダ型を含まず、コンストラクタ・デストラクタでないもの）
- 列挙子
- メンバ変数
- 無名ビットフィールド
- 直接基底クラス関係
- データメンバ仕様


## 戻り値
`r`が上記のいずれかを表す場合、対応する型のリフレクションを返す。列挙子の場合は列挙型のリフレクション、直接基底クラス関係の場合は基底クラスの型のリフレクションを返す。


## 例外
`r`が上記のいずれも表さない場合（型、名前空間、テンプレート、コンストラクタ、デストラクタ、未推論のプレースホルダ戻り値型を持つ関数など）、[`std::meta::exception`](exception.md)例外を送出する。

## 例
```cpp example
#include <meta>

int x = 42;

int main() {
  static_assert(std::meta::type_of(^^x) == ^^int);
}
```

### 出力
```
```


## バージョン
### 言語
- C++26

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P2996R13 Reflection for C++26](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p2996r13.html)
