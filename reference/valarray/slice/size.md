# size
* valarray[meta header]
* std[meta namespace]
* slice[meta class]
* function[meta id-type]

```cpp
size_t size() const;
```
* size_t[link /reference/cstddef/size_t.md]

## 概要
スライスを生成する要素数を取得する。

## 戻り値
スライスを生成する要素数。


## 例
```cpp example
#include <valarray>
#include <iostream>

auto main()
  -> int
{
  constexpr auto start  = 3;
  constexpr auto length = 5;
  constexpr auto stride = 7;

  std::slice s( start, length, stride );

  std::cout << s.size();
}
```
* size()[color ff0000]

### 出力
```
5
```
