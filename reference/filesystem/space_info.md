# space_info
* filesystem[meta header]
* std::filesystem[meta namespace]
* class[meta id-type]
* cpp17[meta cpp]

```cpp
namespace std::filesystem {
  struct space_info;
}
```

## 概要
`std::filesystem::space_info`は、ディスク容量を表すクラスである。

`available`の値はOS依存であるが、値としては`free`以下となるだろう。POSIX環境では、非特権プロセスが使用できる容量を表す。


## メンバ関数
### 比較演算子

| 名前 | 説明 | 対応バージョン |
|------|------|----------------|
| `friend bool operator==(const space_info&, const space_info&) = default;` | 等値比較 | C++20 |
| `friend bool operator!=(const space_info&, const space_info&);` | 非等値比較 (`==`により使用可能) | C++20 |


## メンバ変数

| 名前 | 説明 | 対応バージョン |
|------|------|-------|
| [`uintmax_t`](/reference/cstdint/uintmax_t.md) `capacity`   | 全体の容量 (単位はバイト) | C++17 |
| [`uintmax_t`](/reference/cstdint/uintmax_t.md) `free;`      | 空き容量 (単位はバイト) | C++17 |
| [`uintmax_t`](/reference/cstdint/uintmax_t.md) `available;` | 使用できる容量 (単位はバイト) | C++17 |


## 例
### Linux環境の例
```cpp example
#include <iostream>
#include <filesystem>

namespace fs = std::filesystem;

void print_space(const char* name, std::uintmax_t bytes)
{
  std::uintmax_t mega_bytes = bytes / (1024 * 1024);
  std::cout << name << " : " << bytes << "[B]"
            << " (" << mega_bytes << "[MB])" << std::endl;
}

int main()
{
  fs::path p = "/";
  fs::space_info info = fs::space(p);

  std::cout << p << std::endl;
  print_space("capacity", info.capacity);
  print_space("free", info.free);
  print_space("available", info.available);
}
```
* fs::space_info[color ff0000]
* fs::space[link space.md]
* std::uintmax_t[link /reference/cstdint/uintmax_t.md]

#### 出力例
```
"/"
capacity : 1048580096[B] (1000[MB])
free : 1048580096[B] (1000[MB])
available : 1048580096[B] (1000[MB])
```

仮想環境で実行しているため、空き容量が減っていない。実環境で動かせるようになったら出力例を更新する。


## バージョン
### 言語
- C++17

### 処理系
- [Clang](/implementation.md#clang): 7.0 [mark verified]
- [GCC](/implementation.md#gcc): 8.1 [mark verified]
- [Visual C++](/implementation.md#visual_cpp):


## 参照
- [P1614R2 The Mothership has Landed](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p1614r2.html)
    - C++20での三方比較演算子の追加と、関連する演算子の自動導出
