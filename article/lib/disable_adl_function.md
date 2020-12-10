# ADLを無効にする関数定義

C++20から、[`<iterator>`](/reference/iterator.md)や[`<algorithm>`](/reference/algorithm.md)にある一部の関数テンプレートに対して、よりジェネリックに定義し直されたものが`std::ranges`名前空間に同じ名前で追加されている。

規格書においてはこれらの関数テンプレートはADLで発見されない事を規定している。  
そのうちの一つである[`std::ranges::distance`](/reference/iterator/ranges_distance.md)を例として上げると、次のような場合にADLを無効化して呼び出される。

```cpp
void foo() {
  // std::ranges名前空間を取り込む
  using namespace std::ranges;

  std::vector<int> vec{1,2,3};
  distance(begin(vec), end(vec)); // #1
}
```

`#1`の箇所で呼ばれる関数は`std::distance`ではなく`std::ranges::distance`となる。オーバーロードの半順序においてはより特殊化されている関数テンプレートが選択されると言うルールがあり、`std::distance`の方が`std::ranges::distance`よりも特殊化されている（イテレータ型と番兵型が1つのテンプレートパラメータで指定されている）が、それとは関係なく常に`std::ranges::distance`が選択される。

これは、`std::ranges`以下にあるこのような規定を持つ関数が通常の（修飾・非修飾名に対する）名前探索で見えているときは必ずそちらが選択されると言う事であり、その際はADLが行われない（無効化される）事を規定している。

`std::ranges`名前空間に追加される関数テンプレート群は、同名の`std`名前空間直下にある既存のものに対してC++20の`<ranges>`が規定するイテレータ/rangeコンセプトに適合するように再設計されたものであり、このような規定はC++20以降古い関数が意図せず使用されないようにするための処置であると考えられる。

この性質は通常の関数では実現できず、これらの関数テンプレートは実のところ関数テンプレートではない。おそらく関数オブジェクトとして実装されるものと思われる。以下は、関数オブジェクトによる実装例である：

```cpp
#include <iostream>
#include <iterator>
#include <vector>

namespace my_range {
  struct distance_t {
    template <class Iterator>
    auto operator()(Iterator first, Iterator last) const {
      std::cout << "call my_distance" << std::endl;
      int n = 0;
      for (;first != last; ++first, ++n) {}
      return n;
    }
  };
  constexpr inline distance_t distance{};
}

int main() {
  using namespace my_range;

  std::vector<int> v = {1, 2, 3};
  int n = distance(begin(v), end(v));
  std::cout << n << std::endl;
}
```

出力：

```
call my_distance
3
```


## 呼称について

このように規定された関数テンプレートを指す公式の名称や広く合意された呼称はないが、これらの発明者であり提案者であるEric Niebler氏の名前から*niebloid*と呼ばれる事がある。

## 参照

- [What is a niebloid? - stackoverflow](https://stackoverflow.com/questions/62928396/what-is-a-niebloid)
- [謎の用語niebloid - にゃははー](http://flast.hateblo.jp/entry/2019/03/19/090722)
