# コンストラクタ
* regex[meta header]
* std[meta namespace]
* match_results[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
match_results(const Allocator& a = Allocator());    // (1)
match_results() : match_results(Allocator()) {}     // (1) C++20

match_results(const Allocator& a);                  // (2) C++20

match_results(const match_results& m);              // (3)

match_results(match_results&& m) noexcept;          // (4)
```

## 概要
`match_results` オブジェクトを構築する。


## 要件
- (4) `Allocator` のムーブコンストラクタは例外で終了しないこと。


## 効果
- (1) デフォルトコンストラクタ。
    - C++17まで : 指定したアロケータ`a`を用いて`match_results` オブジェクトを構築する。
    - C++20 : アロケータをデフォルト構築して`match_results` オブジェクトを構築する。
- (2) 指定したアロケータ`a`を用いて`match_results` オブジェクトを構築する。
- (3) コピーコンストラクタ。引数 `m` をコピーした `match_results` オブジェクトを構築する。
- (4) ムーブコンストラクタ。引数 `m` をムーブした `match_results` オブジェクトを構築する。


## 事後条件
- (1), (2) [`ready`](ready.md)`() == false`、かつ、[`size`](size.md)`() == 0`、かつ、[`get_allocator`](get_allocator.md)`() == a`
- (3) 構築したオブジェクトを `u` とすると、`u == m`
- (4) 以下の表を満たす。

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
    | [`get_allocator`](get_allocator.md)`()` | `m.`[`get_allocator`](get_allocator.md)`(n)`                                                  |


## 計算量
- (1), (2) 定数時間
- (3) 線形時間
- (4) 定数時間


## 備考
規格では明確ではないものの、(3) の形式でも以下の事後条件を満たすべきであると思われる。

- (4) の事後条件のアロケータ以外のもの
- [`get_allocator`](get_allocator.md)`() ==` [`allocator_traits`](../../memory/allocator_traits.md)`<allocator_type>::`[`select_on_container_copy_construction`](../../memory/allocator_traits/select_on_container_copy_construction.md)`(m.`[`get_allocator`](get_allocator.md)`())`


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
    std::cout << "suffix:'" << m.suffix() << '\'' << std::endl;
  }
  std::cout << std::endl;
}

int main()
{
  const char s[] = " abc 123 def ";
  const std::regex re("(\\w+) (\\d+) (\\w+)");

  std::cmatch m1;                   // (1) の形式
  print(m1);

  std::regex_search(s, m1, re);
  print(m1);

  std::cmatch m2(m1);               // (3) の形式
  print(m2);

  std::cmatch m3(std::move(m1));    // (4) の形式
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
ready:false

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
- [Clang](/implementation.md#clang): 3.0 [mark verified], 3.1 [mark verified], 3.2 [mark verified], 3.3 [mark verified], 3.4 [mark verified], 3.5 [mark verified], 3.6 [mark verified]
- [GCC](/implementation.md#gcc): 4.9.0 [mark verified], 4.9.1 [mark verified], 5.0.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??

### 備考
GCC(libstdc++) の 4.9.2 までは、[`regex_iterator`](../regex_iterator.md) を間接参照した結果から (2)、あるいは、(3) の形式で構築した場合に [`position`](position.md) の結果が正しくコピーされない。これは、4.9.3 以降で修正される予定である。

## 参照

- [P0935R0 Eradicating unnecessarily explicit default constructors from the standard library](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0935r0.html)
