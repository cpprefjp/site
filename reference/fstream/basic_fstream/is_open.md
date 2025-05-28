# is_open
* fstream[meta header]
* std[meta namespace]
* basic_fstream[meta class]
* function[meta id-type]

```cpp
bool is_open() const;
```

## 概要

開いている状態であることの判定をする。

## 戻り値

[`rdbuf()->is_open()`](/reference/fstream/basic_filebuf/is_open.md)

## 例

```cpp example
#include <iostream>
#include <fstream>

int main()
{
  std::fstream fs("foo", std::ios_base::out);
  if (fs.is_open()) {
    std::cout << "opened" << std::endl;
  }
}
```
* std::fstream[link /reference/fstream/basic_fstream.md]
* is_open()[color ff0000]

### 出力

```
opened
```

## バージョン
### 言語
- C++98
