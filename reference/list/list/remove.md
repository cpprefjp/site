# remove
* list[meta header]
* std[meta namespace]
* list[meta class]
* function[meta id-type]

```cpp
void remove(const T& value);      // (1) C++03
size_type remove(const T& value); // (1) C++20
```

## 概要
指定された値の要素を全て削除する。


## 効果
コンテナの全ての要素に対する各イテレータ`i`において、`*i == value`による比較が`true`となる要素を削除する。  
削除された要素に対するイテレータおよび参照は無効となる。


## 戻り値
- C++03 : なし
- C++20 : 削除された要素数を返す


## 例外
型`T`の�値比較が例外を投げなければ、この関数は例外を投げない


## 計算量
ちょうど`x`の要素数回だけ�値比較を行う


## 例
```cpp example
#include <iostream>
#include <list>

int main()
{
  std::list<int> ls = {3, 1, 4, 1};

  ls.remove(1); // 値1の要素を全て削除

  for (int x : ls) {
    std::cout << x << std::endl;
  }
}
```
* remove[color ff0000]

### 出力
```
3
4
```


## 参照
- [P0646R1 Improving the Return Value of Erase-Like Algorithms I: list/forward list](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0646r1.pdf)
