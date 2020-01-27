# operator=
* regex[meta header]
* std[meta namespace]
* match_results[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
match_results& operator=(const match_results& m);       // (1)

match_results& operator=(match_results&& m) noexcept;   // (2)
```

## 概要
`match_results` オブジェクトを代入する。


## 要件
- (1) `value_type`（[`sub_match`](../sub_match.md)`<BidirectionalIterator>`）はこのコンテナに対してコピー挿入可能（CopyInsertable）であること。
- (2) [`allocator_traits`](../../memory/allocator_traits.md)`<allocator_type>::propagate_on_container_move_assignment::value == false` である場合、`value_type`（[`sub_match`](../sub_match.md)`<BidirectionalIterator>`）はこのコンテナに対してムーブ挿入可能（MoveInsertable）であること。


## 効果
- (1) コピー代入演算�。引数 `m` を `*this` にコピー代入する。
- (2) ムーブ代入演算�。引数 `m` を `*this` にムーブ代入する。`*this` の全ての既�の要素はムーブ代入されるか破棄される。


## 事後条件
- (1)、(2) 以下の表を満たす。

    | 要素                                    | 値                                                                                            |
    |-----------------------------------------|-----------------------------------------------------------------------------------------------|
    | [`ready`](ready.md)`()`                 | `m.`[`ready`](ready.md)`()`                                                                   |
    | [`size`](size.md)`()`                   | `m.`[`size`](size.md)`()`                                                                     |
    | [`str`](str.md)`(n)`                    | `n <` [`size`](size.md)`()` である全ての整数 `n` について、`m.`[`str`](str.md)`(n)`           |
    | [`prefix`](prefix.md)`()`               | `m.`[`prefix`](prefix.md)`()`                                                                 |
    | [`suffix`](suffix.md)`()`               | `m.`[`suffix`](suffix.md)`()`                                                                 |
    | `(*this)[n]`                            | `n <` [`size`](size.md)`()` である全ての整数 `n` について、`m[n]`                             |
    | [`length`](length.md)`()`               | `n <` [`size`](size.md)`()` である全ての整数 `n` について、`m.`[`length`](length.md)`(n)`     |
    | [`position`](position.md)`()`           | `n <` [`size`](size.md)`()` である全ての整数 `n` について、`m.`[`position`](position.md)`(n)` |


## 計算量
- (1) 線形時間
- (2) 線形時間


## 備考
規格では明確ではないものの、以下の事後条件を満たすべきであると思われる。

- (1) [`allocator_traits`](../../memory/allocator_traits.md)`<allocator_type>::propagate_on_container_copy_assignment::value == true` である場合、[`get_allocator`](get_allocator.md)`() == m.`[`get_allocator`](get_allocator.md)`()`
- (2) [`allocator_traits`](../../memory/allocator_traits.md)`<allocator_type>::propagate_on_container_move_assignment::value == true` である場合、[`get_allocator`](get_allocator.md)`() == m.`[`get_allocator`](get_allocator.md)`()`


## 例
```cpp example
#include <iostream>
#include <regex>

void print(const std::cmatch& m)
{
  std::cout << "ready:" << std::boolalpha << m.ready() << std::endl;
  if (m.ready()) {
    std::cout << "prefix:'" << m.prefix() << '\'' << std::endl;
    for (std::size_t i = 0, n = m.size(); i < n; ++i) {
      std::cout << i << ":'" << m.str(i) << '\'' << std::endl;
    }
-    std::cout << "suffix:'" << m.suffix() << '\'' << std::endl;
  }
  std::cout << std::endl;
}

int main()
{
  const char s[] = " abc 123 def ";
  const std::regex re("(\\w+) (\\d+) (\\w+)");

  std::cmatch m1, m2, m3;

  std::regex_search(s, m1, re);
  print(m1);

  m2 = m1;                          // (1) の形式
  print(m2);

  m3 = std::move(m1);               // (2) の形式
  print(m3);
}
```
* m.size()[link size.md]
* std::regex[link ../basic_regex.md]
* m.prefix()[link prefix.md]
* m.suffix()[link suffix.md]
* m.str[link str.md]
* m.ready()[link ready.md]
* std::cmatch[link ../match_results.md]
* std::regex_search[link ../regex_search.md]
* std::move[link ../../utility/move.md]

### 出力
```
ready:true
prefix:' '
0:'abc 123 def'
1:'abc'
2:'123'
3:'def'
suffix:' '

ready:true
prefix:' '
0:'abc 123 def'
1:'abc'
2:'123'
3:'def'
suffix:' '

ready:true
prefix:' '
0:'abc 123 def'
1:'abc'
2:'123'
3:'def'
suffix:' '
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): -
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4, 3.5, 3.6
- [GCC](/implementation.md#gcc): 4.9.0, 4.9.1, 5.0.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

### 備考
GCC(libstdc++) の 4.9.2 までは、ア�ケータが上記の備考欄のようには�定されず、また、[`regex_iterator`](../regex_iterator.md) を間接参照した結果を代入した場合に [`position`](position.md) の結果が�しくコピーされない。これは、4.9.3 以降で修�される予定である。
