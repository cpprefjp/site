# use_count
* memory[meta header]
* std[meta namespace]
* shared_ptr[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
long use_count() const noexcept;
```

## 概要
所有権を持つユーザー数を取得する。


## 戻り値
`*this`が持つリソースを共有している`shared_ptr`のオブジェクト数を返す。

`0`が返る場合、`*this`は空の状態となる。


## 例
```cpp
#include <iostream>
#include <memory>

int main()
{
  std::shared_ptr<int> p(new int(3));
  std::shared_ptr<int> q = p;

  long count = p.use_count();
  std::cout << count << std::endl;
}
```
* use_count()[color ff0000]

### 出力
```
2
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC](/implementation.md#gcc): 4.4.7
- [Clang libc++, C++11 mode](/implementation.md#clang): 3.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 9.0 (TR1), 10.0, 11.0, 12.0
