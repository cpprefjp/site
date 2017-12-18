# operator=
* functional[meta header]
* std[meta namespace]
* reference_wrapper[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
reference_wrapper& operator=(const reference_wrapper<T>& x) noexcept;
```

## 概要
参照先を切り替える

## 効果
`*this`が`x.get()`を指すように更新する


## 戻り値
`*this`


## 例
```cpp example
#include <iostream>
#include <functional>

int main()
{
  int x = 3;
  int y = 5;

  // xへの参照を保持する
  std::reference_wrapper<int> r(x);
  r = std::ref(y); // yへの参照を保持するよう切り替える

  r.get() += 1;

  std::cout << x << std::endl;
  std::cout << y << std::endl;
}
```
* std::ref[link /reference/functional/ref.md]
* r.get()[link get.md]

### 出力
```
3
6
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.0
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): ??


## 参照


