# get_deleter
* memory[meta header]
* std[meta namespace]
* unique_ptr[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
deleter_type& get_deleter() noexcept;
const deleter_type& get_deleter() const noexcept;
```

## 概要
デリータを取得する。


## 戻り値
保持しているデリータオブジェクトへの参照を返す。


## 例
```cpp example
#include <iostream>
#include <memory>

int main()
{
  std::unique_ptr<int> p(new int(3));

  // デリータを取得
  std::default_delete<int>& f = p.get_deleter();
}
```
* get_deleter()[color ff0000]
* std::default_delete[link /reference/memory/default_delete.md]

### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [GCC](/implementation.md#gcc): 4.4.7
- [Clang libc++, C++11 mode](/implementation.md#clang): 3.0
- [ICC](/implementation.md#icc): ?
- [Visual C++](/implementation.md#visual_cpp): 2010, 2012, 2013
