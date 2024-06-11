# コンストラクタ
* functional[meta header]
* std[meta namespace]
* default_searcher[meta class]
* function[meta id-type]
* cpp17[meta cpp]

```cpp
default_searcher(ForwardIterator1 pat_first,
                 ForwardIterator1 pat_last,
                 BinaryPredicate pred = BinaryPredicate()); // (1) C++17
constexpr default_searcher(
                 ForwardIterator1 pat_first,
                 ForwardIterator1 pat_last,
                 BinaryPredicate pred = BinaryPredicate()); // (1) C++20

default_searcher(const default_searcher& other) = default;  // (2) C++17
default_searcher(default_searcher&& other) = default;       // (3) C++17
```

## 概要
`default_searcher`オブジェクトを構築する。

このクラスにデフォルトコンストラクタは定義されない。

- (1) : 検索対象 (pattern) のイテレータ範囲`[pat_first, pat_last)`を登録する
- (2) : コピーコンストラクタ
- (3) : ムーブコンストラクタ


## 効果
- (1) : 渡されたパラメータをメンバ変数として保持する


## 例外
- (1) : `ForwardIterator1`と`BinaryPredicate`のコピーコンストラクタが、任意の例外を送出する可能性がある


## 例
```cpp example
#include <string>
#include <functional>
#include <utility>

int main()
{
  // text内のpatternを検索する
  std::string text = "babcabaabaac";
  std::string pattern = "abaa";

  // (1) patternを登録
  std::default_searcher a {
    pattern.cbegin(),
    pattern.cend()
  };

  // (2) コピーコンストラクタ
  auto b = a;

  // (3) ムーブコンストラクタ
  auto c = std::move(b);
}
```
* pattern.cbegin()[link /reference/string/basic_string/cbegin.md]
* pattern.cend()[link /reference/string/basic_string/cend.md]
* std::move[link /reference/utility/move.md]

### 出力
```
```

## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang):
- [GCC](/implementation.md#gcc): 7.3 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P1032R1 Misc `constexpr` bits](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p1032r1.html)
