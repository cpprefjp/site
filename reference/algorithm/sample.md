# sample
* algorithm[meta header]
* std[meta namespace]
* function template[meta id-type]
* cpp17[meta cpp]


```cpp
namespace std {
  template <class PopulationIterator,
            class SampleIterator,
            class Distance,
            class UniformRandomBitGenerator>
  SampleIterator
    sample(PopulationIterator first,
           PopulationIterator last,
           SampleIterator out, Distance n,
           UniformRandomBitGenerator&& g);
}
```

## 概要
イテレータ範囲`[first, last)`から指定された個数の要素をランダムに抽出する。


## テンプレートパラメータ制約
- `PopulationIterator` は `InputIterator` の要件を満たしていること
- `SampleIterator` は `OutputIterator` の要件を満たしていること
- `PopulationIterator`が `ForwardIterator` の要件を満たさない限り、`SampleIterator`は`RandomAccessIterator`の要件を満たさなければならない
- `PopulationIterator`の値型は`out`に対して書き込めなければならない
- `Distance`は整数型であること
- `UniformRandomBitGenerator` は uniform random bit generator の要件を満たさなければならず、その戻り値の型は`Distance`型へ変換可能でなければならない


## 事前条件
- `out`はイテレータ範囲`[first, last)`に含まれてはならない


## 効果
イテレータ範囲`[first, last)`を母集団 (population) とし、そこから[`min`](min.md)`(last - first, n)`個の要素を標本 (sample) として `out` にコピーする (`n`が入力範囲の要素数より大きい場合は、最大で入力範囲の要素数がコピーされる)。


## 戻り値
出力範囲の最後のイテレータが返る


## 計算量
範囲`[first, last)`の要素数に対して線形時間


## 備考
このアルゴリズムの実装には、以下の2つのバージョンが使用される：

- 出力をランダムアクセスで行うバージョン : KnuthのAlgorithm R (Reservoir sampling)
- 出力を前から順番に行うバージョン : KnuthのAlgorithm S (Selection sampling)

これらのアルゴリズムは、イテレータカテゴリによって、コンパイル時に自動的に選択されることになる。


## 例
```cpp example
#include <iostream>
#include <string>
#include <iterator>
#include <random>
#include <algorithm>

int main()
{
  // 乱数生成器を用意する
  std::random_device seed_gen;
  std::mt19937 engine {seed_gen()};

  // 文字列中から3文字をランダム抽出する
  {
    const std::string input = "abcdef";
    const int n = 3;

    std::string result;
    std::sample(input.begin(),
                input.end(),
                std::back_inserter(result),
                n,
                engine);
    std::cout << result << std::endl;
  }

  // 配列から3要素をランダム抽出する
  {
    const std::vector<int> input = {0, 1, 2, 3, 4, 5};
    const int n = 3;

    std::vector<int> result;
    std::sample(input.begin(),
                input.end(),
                std::back_inserter(result),
                n,
                engine);

    for (int x : result) {
      std::cout << x;
    }
    std::cout << std::endl;
  }
}
```
* std::sample[color ff0000]

### 出力例
```
bcd
235
```


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 4.0 [mark verified]
- [GCC](/implementation.md#gcc): 7.2 [mark verified]
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照
- [N3547 Three `<random>`-related Proposals](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3547.pdf)
- [Three `<random>`-related Proposals, v2](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2013/n3742.pdf)
- [N3842 A `sample` Proposal](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2014/n3842.pdf)
- [N4531 `std::rand` replacement, revision 3](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2015/n4531.html)
- [P0220R0 Adopt Library Fundamentals TS for C++17](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0220r0.html)
- [P0220R1 Adopt Library Fundamentals V1 TS Components for C++17 (R1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2016/p0220r1.html)
