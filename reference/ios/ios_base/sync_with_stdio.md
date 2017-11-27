# sync_with_stdio
* ios[meta header]
* function[meta id-type]
* std[meta namespace]
* ios_base[meta class]

```cpp
static bool sync_with_stdio(bool sync = true);
```

## 概要
標準ストリームオブジェクトと C 言語ライブラリの標準ストリーム（stdio）との同期状態を設定する。


## 効果
もし、本関数が呼び出される前に標準ストリームで入出力が行われていた場合、効果は実装依存である。  
そうでなくて、もし引数 `sync` が `false` であれば、標準ストリームオブジェクトは C 言語ライブラリの標準ストリームと独立で動作してよい。


## 戻り値
本関数が呼び出される前の標準ストリームオブジェクトの同期状態。同期していたら `true`、していなければ `false`。  
本関数を初めて呼び出した場合、`true`（つまり、初期状態は同期している）。


## 備考
標準ストリーム `str` が C 言語ライブラリの標準ストリーム `f` と同期している場合、

- 文字 `c` のストリームへの出力 [`fputc`](../../cstdio/fputc.md.nolink)`(f, c);` は `str.`[`rdbuf`](../basic_ios/rdbuf.md)`()->`[`sputc`](../../streambuf/basic_streambuf/sputc.md.nolink)`(c);` と同等であり、
- 文字 `c` のストリームからの入力 `c =` [`fgetc`](../../cstdio/fgetc.md.nolink)`(f);` は `c = str.`[`rdbuf`](../basic_ios/rdbuf.md)`()->`[`sbumpc`](../../streambuf/basic_streambuf/sbumpc.md.nolink)`();` と同等であり、
- 文字 `c` のストリームへの戻し [`ungetc`](../../cstdio/ungetc.md.nolink)`(c, f)` は `str.`[`rdbuf`](../basic_ios/rdbuf.md)`()->`[`sputbackc`](../../streambuf/basic_streambuf/sputbackc.md.nolink)`(c);` と同等である。


## 例
```cpp example
#include <iostream>
#include <cstdio>

int main()
{
  std::ios_base::sync_with_stdio(false);
  std::cout << '1';
  std::putchar('2');
  std::cout << '3';
  std::putchar('4');
}
```
* sync_with_stdio[color ff0000]
* std::ios_base[link ../ios_base.md]
* std::putchar[link ../../cstdio/putchar.md.nolink]

### 出力例
```
1324
```


## 参照
- 標準ストリームオブジェクト
    - [`cin`](../../iostream/cin.md)
    - [`cout`](../../iostream/cout.md)
    - [`cerr`](../../iostream/cerr.md)
    - [`clog`](../../iostream/clog.md)
    - [`wcin`](../../iostream/wcin.md.nolink)
    - [`wcout`](../../iostream/wcout.md.nolink)
    - [`wcerr`](../../iostream/wcerr.md.nolink)
    - [`wclog`](../../iostream/wclog.md.nolink)
- C 言語ライブラリの標準ストリームオブジェクト
    - [`stdin`](../../cstdio/stdin.md.nolink)
    - [`stdout`](../../cstdio/stdout.md.nolink)
    - [`stderr`](../../cstdio/stderr.md.nolink)
