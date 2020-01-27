# unitbuf
* ios[meta header]
* std[meta namespace]
* function[meta id-type]

```cpp
namespace std {
  ios_base& unitbuf(ios_base& str);
}
```

## 概要
出力操作の都度バッファを吐き出すことを指示するマニピュレータ。

## 効果
`str.setf(std::ios_base::unitbuf)`を実行する。

## 戻り値
実引数のstrオブジェクト。

## 備考
[`std::cerr`](../iostream/cerr.md)と[`std::wcerr`](../iostream/wcerr.md.nolink)オブジェクトは、
初期状態として`std::ios_base::unitbuf`が�定されている。

## 例
```cpp example
#include <iostream>

int main()
{
  std::ios_base::sync_with_stdio(false);
  std::clog.tie(nullptr);

  std::cout << std::unitbuf;

  std::cout << '1';
  std::clog << 'A';
  std::cout << '2';
  std::clog << 'B';
  std::cout << '3';
  std::clog << 'C';

  std::cout << std::endl;
  std::clog << std::endl;
}
```
* std::unitbuf[color ff0000]
* std::ios_base[link ios_base.md]
* sync_with_stdio[link ios_base/sync_with_stdio.md]
* std::clog[link /reference/iostream/clog.md]
* tie[link basic_ios/tie.md]

### 出力
```
123
ABC
```

標準出力と標準エラー出力が同一主力先であることを前提とする。  
'1'、'2'、'3'はすぐに出力され、"ABC"は`std::clog << std::endl;`が行われた際に出力されることを表現している。

## バージョン
### 言語
- C++03

## 参照
- [`nounitbuf`](nounitbuf.md)
