# swap
* memory[meta header]
* std[meta namespace]
* unique_ptr[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
void swap(unique_ptr& x) noexcept;
```

## 概要
他の`unique_ptr`オブジェクトとデータを入れ替える。


## 要件
デリータ`D`が、例外を投げないという保証のもとに`swap`可能であること。


## 効果
`*this`と`x`が保持する、ポインタとデリータオブジェクトそれぞれに対して、`swap()`関数を実行する。


## 戻り値
なし


## 例
```cpp
#include <iostream>
#include <memory>

int main()
{
  std::unique_ptr<int> a(new int(3));
  std::unique_ptr<int> b(new int(1));

  // aとbを入れ替える
  a.swap(b);

  std::cout << *a << std::endl;
  std::cout << *b << std::endl;
}
```
* swap[color ff0000]

### 出力
```
1
3
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC](/implementation.md#gcc): 4.4.7
- [Clang libc++, C++11 mode](/implementation.md#clang): 3.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 10.0, 11.0, 12.0
