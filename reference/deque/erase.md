#erase
* deque[meta header]
* std[meta namespace]
* deque[meta class]
* function[meta id-type]

```cpp
iterator erase(iterator position);                         // (1) C++03
iterator erase(const_iterator position);                   // (1) C++11

iterator erase(iterator first, iterator last);             // (2) C++03
iterator erase(const_iterator first, const_iterator last); // (2) C++11
```

##概要
指定した要素を削除する。`deque`は、シーケンスの終端または先頭からの要素の削除(と追加)が効果的となるよう設計されている。他の位置からの削除は通常、[`list`](/reference/list.md)コンテナよりも効率で劣る。


##効果
- (1) : `position`が指す要素を削除する。
- (2) : `[first, last)`で示される範囲の要素を削除する。

もし削除がシーケンスの先頭または末尾から行われた場合、削除された要素へのイテレータと参照は無効化される。もし削除が中間位置から行われた場合、全てのイテレータと削除は無効化される。


##戻り値
削除された要素の次の要素を指すイテレータを返す。そのような要素が存在しない場合は、[`end()`](end.md)を返す。さらに、削除された要素以降の要素の数と同じ回数の`T`のムーブ代入演算子が呼ばれる。


##計算量
削除された要素の数に対して線形時間（デストラクタ呼び出し）。加えて、`position`と終端位置の間にある要素の数に対してライブラリの実装に依存して線形時間で増加する。


##例
```cpp
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

###出力
```
1
4

4
```

##参照
- [N2350 Container insert/erase and iterator constness (Revision 1)](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2007/n2350.pdf)
- [LWG Issue 638. `deque` end invalidation during erase](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#638)

