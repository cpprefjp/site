# is_open
* fstream[meta header]
* std[meta namespace]
* basic_filebuf[meta class]
* function[meta id-type]

```cpp
bool is_open() const;
```

## 概要

開いている状態であることの判定をする。

## 戻り値

直前の[`open`](/reference/fstream/basic_filebuf/open.md)の呼び出しが成功していて(`nullptr`ではない値を返していて)、かつ閉じるような操作が行われていなければ`true`を返す。

## 例
```cpp example
#include <iostream>
#include <fstream>

int main()
{
  std::fstream fs("foo", std::ios_base::out);
  std::filebuf* buf = fs.rdbuf();

  if (buf->is_open()) {
    std::cout << "opened" << std::endl;
  }
}
```
* std::fstream[link /reference/fstream/basic_fstream.md]
* std::filebuf[link /reference/fstream/basic_filebuf.md]
* rdbuf()[link /reference/fstream/basic_fstream/rdbuf.md]
* is_open()[color ff0000]

### 出力

```
opened
```

## バージョン
### 言語
- C++98
