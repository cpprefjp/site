# lookup
* map[meta header]
* std[meta namespace]
* map[meta class]
* function[meta id-type]
* cpp29[meta cpp]

```cpp
constexpr optional<mapped_type&> lookup(const key_type& x);             // (1) C++29
constexpr optional<const mapped_type&> lookup(const key_type& x) const; // (2) C++29

template <class K>
constexpr optional<mapped_type&> lookup(const K& x);                    // (3) C++29

template <class K>
constexpr optional<const mapped_type&> lookup(const K& x) const;        // (4) C++29
```
* optional[link /reference/optional/optional.md]

## 概要
指定したキーを持つ要素を検索し、対応する値への参照を[`std::optional`](/reference/optional/optional.md)として取得する。キーに対応する要素が存在しない場合は無効値を返す。

[`operator[]`](op_at.md)と違ってコンテナが変更されることはなく、[`at()`](at.md)と違って例外も送出されない。キーが存在しない場合の代替値は、戻り値に対して[`value_or()`](/reference/optional/optional/value_or.md)などで簡潔に指定できる。

- (1), (2) : クラスのテンプレートパラメータ`key_type`型のキーに対応する要素を検索する
- (3), (4) : `key_type`と比較可能な`K`型のキーに対応する要素を検索する


## テンプレートパラメータ制約
- (3), (4) : `key_compare::is_transparent` が妥当な式であること


## 事前条件
- [`find`](find.md)`(x)`が妥当な式であり、定義された動作をすること


## 戻り値
[`contains`](contains.md)`(x)`が`true`であれば[`find`](find.md)`(x)->second`への参照を保持する`optional`オブジェクトを返し、そうでなければ無効値を返す。


## 計算量
要素数に対して対数時間


## 備考
- 戻り値の型は、C++26で追加された参照に対する`optional`（[`std::optional`](/reference/optional/optional.md)`<T&>`）である
- (3), (4) :
    - これらのオーバーロードは、`map<string, int>`のようなコンテナに対し、検索操作で文字列リテラルを渡した際に、キー型の一時オブジェクトが生成されるコストを減らすためにある


## 例
```cpp
#include <map>
#include <iostream>
#include <optional>
#include <string>

int main()
{
  std::map<std::string, int> m = {{"Alice", 3}, {"Bob", 1}};

  // キーが存在すれば対応する値を、存在しなければ代替値0を取得する
  std::cout << m.lookup("Alice").value_or(0) << std::endl;
  std::cout << m.lookup("Carol").value_or(0) << std::endl;

  // 参照を通じて要素を書き換えることもできる
  if (auto v = m.lookup("Bob")) {
    *v = 10;
  }
  std::cout << m.at("Bob") << std::endl;
}
```
* lookup[color ff0000]
* value_or[link /reference/optional/optional/value_or.md]
* m.at[link at.md]

### 出力
```
3
0
10
```


## バージョン
### 言語
- C++29

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 関連項目
- [`at`](at.md)
- [`operator[]`](op_at.md)
- [`find`](find.md)
- [`contains`](contains.md)
- [`std::optional`](/reference/optional/optional.md)


## 参照
- [P3091R6 Better Lookups for `map`, `unordered_map`, and `flat_map`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2026/p3091r6.html)
- [P4139R3 Better Name for Better Lookups in P3091](https://wg21.link/p4139r3)
    - 当初`get`という名前で提案されていたが、この提案の議論により`lookup`に変更された
