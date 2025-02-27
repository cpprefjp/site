# empty
* regex[meta header]
* std[meta namespace]
* match_results[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
bool empty() const;               // (1) C++11
[[nodiscard]] bool empty() const; // (1) C++20
bool empty() const;               // (1) C++26
```

## 概要
`*this` が空か否か（つまり、マッチが失敗したか否か）を返す。


## 戻り値
[`size`](size.md)`() == 0`


## 備考
- [`regex_match`](../regex_match.md)、および、[`regex_search`](../regex_search.md) の引数に渡した [`match_results`](../match_results.md) オブジェクトは、マッチが成功すると `empty() != true` となる。  
    [`match_results`](../match_results.md) オブジェクトの結果が利用可能か否かを確認する場合には [`ready`](ready.md) を使用すると良い。
- [`regex_iterator`](../regex_iterator.md) を間接参照して得られる [`match_results`](../match_results.md) オブジェクトは、必ず `empty() != true` となる。
- `empty() == true` の場合、[`match_results`](../match_results.md) のメンバ関数には結果が未規定であるものがあるので、注意が必要である（[`regex_match`](../regex_match.md)、および、[`regex_search`](../regex_search.md) を参照）。
- 本メンバ関数は [`ready`](ready.md)`() == false` でも呼び出すことが可能である（その場合、`true` が返される）。


## 例
```cpp example
#include <iostream>
#include <regex>

int main()
{
  const char s1[] = " abc ";
  const char s2[] = " 012 ";
  const std::regex re("\\d+");

  std::cmatch m;
  // regex_search 実行前
  std::cout << std::boolalpha << "ready = " << m.ready() << ", empty = " << m.empty() << std::endl;

  // regex_search 実行後（マッチ失敗）
  if (std::regex_search(s1, m, re)) {
    std::cout << "match:ready = " << m.ready() << ", empty = " << m.empty() << std::endl;
  } else {
    std::cout << "not match:ready = " << m.ready() << ", empty = " << m.empty() << std::endl;
  }

  // regex_search 実行後（マッチ成功）
  if (std::regex_search(s2, m, re)) {
    std::cout << "match:ready = " << m.ready() << ", empty = " << m.empty() << std::endl;
  } else {
    std::cout << "not match:ready = " << m.ready() << ", empty = " << m.empty() << std::endl;
  }
}
```
* empty()[color ff0000]
* std::regex[link ../basic_regex.md]
* std::cmatch[link ../match_results.md]
* std::regex_search[link ../regex_search.md]
* m.ready()[link ready.md]

### 出力
```
ready = false, empty = true
not match:ready = true, empty = true
match:ready = true, empty = false
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0 [mark verified], 3.1 [mark verified], 3.2 [mark verified], 3.3 [mark verified], 3.4 [mark verified], 3.5 [mark verified], 3.6 [mark verified]
- [GCC](/implementation.md#gcc): 4.9.0 [mark verified], 4.9.1 [mark verified], 5.0.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [P0600R1 `[[nodiscard]]` in the Library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2017/p0600r1.pdf)
    - C++20で`[[nodiscard]]`が付加された
- [P2422R1 Remove `nodiscard` annotations from the standard library specification](https://open-std.org/jtc1/sc22/wg21/docs/papers/2024/p2422r1.html)
    - C++26で`[[nodiscard]]`指定が削除された
