# unique
* forward_list[meta header]
* std[meta namespace]
* forward_list[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
void unique();                          // (1) C++11
size_type unique();                     // (1) C++20

template <class BinaryPredicate>
void unique(BinaryPredicate pred);      // (2) C++11

template <class BinaryPredicate>
size_type unique(BinaryPredicate pred); // (2) C++20
```

## 概要
コンテナから重複した要素を削除する


## 要件
コンテナがソート済みであること。ソート済みでない場合、この関数の動作は未規定。


## 効果
イテレータ範囲`[first + 1, last)`の全てのイテレータ`i`について、

- (1) : `*i == *(i - 1)`
- (2) : `pred(*i, *(i - 1))`

が`true`となる要素を削除する。  
削除された要素に対するイテレータおよび参照は無効となる。


## 戻り値
- (1), (2) :
    - C++11 : なし
    - C++20 : 削除された要素数を返す


## 例外
- (1) : 型`T`の等値比較が例外を投げない場合、この関数は例外を投げない
- (2) : `pred`が例外を投げない場合、この関数は例外を投げない


## 計算量
ちょうど`(last - first) - 1`回の等値比較、もしくは述語の適用を行う。


## 例
```cpp example
#include <iostream>
#include <forward_list>

int main()
{
  std::forward_list<int> ls = {3, 1, 4, 1};

  ls.sort();
  ls.unique();

  for (int x : ls) {
    std::cout << x << std::endl;
  }
}
```
* unique()[color ff0000]
* ls.sort()[link sort.md]

### 出力
```
1
3
4
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 4.7.0 [mark verified]
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010 [mark verified], 2012 [mark verified], 2013 [mark verified], 2015 [mark verified], 2017 [mark verified]


## 参照
- [P0646R1 Improving the Return Value of Erase-Like Algorithms I: list/forward list](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0646r1.pdf)
