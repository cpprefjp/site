# remove_if
* list[meta header]
* std[meta namespace]
* list[meta class]
* function template[meta id-type]

```cpp
template <class Predicate>
void remove_if(Predicate pred);                // (1) C++03
template <class Predicate>
size_type remove_if(Predicate pred);           // (1) C++20
template <class Predicate>
constexpr size_type remove_if(Predicate pred); // (1) C++26
```

## 概要
条件一致する全ての要素を削除する


## 効果
コンテナの全ての要素に対する各イテレータ`i`において、`pred(*i) == true`となる要素を削除する。  
削除された要素に対するイテレータおよび参照は無効となる。


## 戻り値
- C++03 : なし
- C++20 : 削除された要素数を返す


## 例外
`pred`呼び出しが例外を投げなければ、この関数は例外を投げない


## 計算量
ちょうど`size()`回だけ述語を適用する


## 例
```cpp example
#include <iostream>
#include <list>

int main()
{
  std::list<int> ls = {3, 1, 4, 1};

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


## 参照
- [P0646R1 Improving the Return Value of Erase-Like Algorithms I: list/forward list](http://www.open-std.org/jtc1/sc22/wg21/docs/papers/2018/p0646r1.pdf)
- [P3372R3 constexpr containers and adaptors](https://open-std.org/jtc1/sc22/wg21/docs/papers/2025/p3372r3.html)
