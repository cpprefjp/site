# erase
* deque[meta header]
* std[meta namespace]
* deque[meta class]
* function[meta id-type]

```cpp
iterator erase(iterator position);                         // (1) C++98
iterator erase(const_iterator position);                   // (1) C++11
constexpr iterator erase(const_iterator position);         // (1) C++26

iterator erase(iterator first, iterator last);                       // (2) C++98
iterator erase(const_iterator first, const_iterator last);           // (2) C++11
constexpr iterator erase(const_iterator first, const_iterator last); // (2) C++26
```

## 概要
指定した要素を削除する。`deque`は、シーケンスの終端または先頭からの要素の削除(と追加)が効果的となるよう設計されている。他の位置からの削除は通常、[`list`](/reference/list/list.md)コンテナよりも効率で劣る。


## 効果
- (1) : `position`が指す要素を削除する。
- (2) : イテレータ範囲`[first, last)`の要素を削除する。

もし削除がシーケンスの先頭または末尾から行われた場合、削除された要素へのイテレータと参照だけが無効化される（そのほかの要素への参照/イテレータは有効であり続ける）。一方、削除が中間位置から行われた場合は全てのイテレータと参照が無効化される。


## 戻り値
削除された要素の次の要素を指すイテレータを返す。そのような要素が存在しない場合は、[`end()`](end.md)を返す。


## 例外
`T`の代入演算子が例外を投げる場合を除いて、この関数は例外を投げない。この関数はメモリの確保・解放や要素の構築を行わないため、コンストラクタは呼ばれない。


## 計算量
削除される要素の数と同じ回数の`T`のデストラクタが実行される。加えて`T`の代入演算子が呼ばれるが、その回数は「削除された要素より前にある要素数」と「削除された要素より後にある要素数」のうち少ない方以下となる（`deque`は前後どちらからでも要素を詰められるため）。


## 例
### 基本的な使い方 (C++11)
```cpp example
#include <iostream>
#include <deque>

int main()
{
  // 単一要素の削除
  {
    std::deque<int> c = {3, 1, 4};
    c.erase(c.begin()); // 先頭要素を削除する

    for (int x : c) {
      std::cout << x << std::endl;
    }
  }
  std::cout << std::endl;

  // 範囲の削除
  {
    std::deque<int> c = {3, 1, 4};
    c.erase(c.begin(), c.begin() + 2); // 先頭2要素を削除

    for (int x : c) {
      std::cout << x << std::endl;
    }
  }
}
```
* erase[color ff0000]
* c.begin()[link begin.md]

#### 出力
```
1
4

4
```

### イテレート中に要素を削除する (C++11)
```cpp example
#include <iostream>
#include <deque>

int main()
{
  std::deque<int> d = {3, 1, 4};

  // イテレート中に要素削除をするような場合には、
  // 範囲for文は使用できない
  for (auto it = d.begin(); it != d.end();) {
    // 条件一致した要素を削除する
    if (*it == 1) {
      // 削除された要素の次を指すイテレータが返される。
      it = d.erase(it);
    }
    // 要素削除をしない場合に、イテレータを進める
    else {
      ++it;
    }
  }

  for (const auto& x : d) {
    std::cout << x << std::endl;
  }
}
```

#### 出力
```
3
4
```

## 参照
- [N2350 Container insert/erase and iterator constness (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2350.pdf)
- [LWG Issue 638. `deque` end invalidation during erase](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#638)
- [LWG Issue 2953. LWG 2853 should apply to `deque::erase` too](https://cplusplus.github.io/LWG/issue2953)
    - `erase`はメモリ確保・要素構築を行わないため、例外指定からコンストラクタへの言及が削除され`T`の代入演算子のみとされた（`vector::erase`のLWG 2853と同様）。この修正は欠陥報告(DR)であり、C++17にも遡及して適用される
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
