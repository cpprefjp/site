# swap
* functional[meta header]
* std[meta namespace]
* function[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
void swap(function& other) noexcept;
```

## 概要
他の`function`オブジェクトと�身を入れ替える。


## 効果
`*this`が持つ関数と`other`が持つ関数を交換する。


## 戻り値
なし


## 例外
投げない


## 例
```cpp example
#include <iostream>
#include <functional>

int ident(int x) { return x; }
int add(int x) { return x + 1; }

int main()
{
  std::function<int(int)> f = ident;
  std::function<int(int)> g = add;

  // fとgを交換
  f.swap(g);

  std::cout << f(1) << std::endl; // add
  std::cout << g(1) << std::endl; // ident
}
```
* swap[color ff0000]
* f(1)[link op_call.md]
* g(1)[link op_call.md]

### 出力
```
2
1
```


## バージョン
### 言語
- C++11


### 処理系
- [Clang](/implementation.md#clang): 3.0
- [GCC](/implementation.md#gcc): 4.3.6
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照

