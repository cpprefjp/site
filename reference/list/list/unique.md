# unique
* list[meta header]
* std[meta namespace]
* list[meta class]
* function[meta id-type]

```cpp
void unique();                     // (1)

template <class BinaryPredicate>
void unique(BinaryPredicate pred); // (2)
```

## 概要
コンテナから重複した要素を削除する


## 要件
コンテナがソート済みであること。ソート済みでない場合、この関数の動作は未規定。


## 効果
範囲`[first + 1, last)`の全てのイテレータ`i`について、オーバーロードごとに、以下の条件が`true`となる要素を削除する。

- (1) : `*i == *(i - 1)`
- (2) : `pred(*i, *(i - 1))`

削除された要素に対するイテレータおよび参照は無効となる。


## 戻り値
なし


## 例外
比較関数を指定しないバージョン：  
型`T`の等値比較が例外を投げない場合、この関数は例外を投げない


比較関数を指定するバージョン：  
`pred`が例外を投げない場合、この関数は例外を投げない


## 計算量
ちょうど`(last - first) - 1`回の等値比較、もしくは述語の適用を行う。


## 例
```cpp example
#include <iostream>
#include <list>

int main()
{
  std::list<int> ls = {3, 1, 4, 1};

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


