# skipws
* ios[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  ios_base& skipws(ios_base& str);
}
```

## 概要
書式入力を開始する際に空白の�み飛ばすことを指示するマニピュレータ。

## 効果
`str.setf(std::ios_base::skipws)`を実行する。

## 戻り値
実引数のstrオブジェクト。

## 例
```cpp example
#include <iostream>
#include <sstream>

int main()
{
  std::istringstream s("1 2");

  char a, b, c;
  s >> std::noskipws >> a >> b >> c;
  std::cout << a << b << c << std::endl;

  s.seekg(0, std::ios_base::beg);
  s >> std::skipws >> a >> b;
  std::cout << a << b << std::endl;
}
```
* std::skipws[color ff0000]
* std::noskipws[link noskipws.md]
* std::istringstream[link /reference/sstream/basic_istringstream.md]
* s.seekg[link /reference/istream/basic_istream/seekg.md]
* std::ios_base[link ios_base.md]
* beg[link ios_base/type-seekdir.md]

### 出力
```
1 2
12
```

## バージョン
### 言語
- C++03

## 参照
- [`noskipws`](noskipws.md)
