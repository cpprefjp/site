# remove_if
* forward_list[meta header]
* std[meta namespace]
* forward_list[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
template <class Predicate>
void remove_if(Predicate pred);
```

## 概要
条件一致する全ての要素を削除する


## 効果
コンテナの全ての要素に対する各イテレータ`i`において、`pred(*i) == true`となる要素を削除する。

削除された要素に対するイテレータおよび参照は無効となる。


## 戻り値
なし


## 例外
`pred`呼び出しが例外を投げなければ、この関数は例外を投げない


## 計算量
ちょうど`x`の要素数回だけ述語を適用する


## 例
```cpp
#include <iostream>
#include <forward_list>

int main()
{
  std::forward_list<int> ls = {3, 1, 4, 1};

  ls.remove_if([](int x) { return x == 1; }); // 値1の要素を全て削除

  for (int x : ls) {
    std::cout << x << std::endl;
  }
}
```
* remove_if[color ff0000]

### 出力
```
3
4
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 10.0, 11.0, 12.0, 14.0, 14.1


## 参照


