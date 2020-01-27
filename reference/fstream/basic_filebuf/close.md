# close
* fstream[meta header]
* std[meta namespace]
* basic_filebuf[meta class]
* function[meta id-type]

```cpp
basic_filebuf* close();
```

## 概要

put領域をクリアし、ファイルを閉じる

## 効果

[`is_open()`](is_open.md)の呼び出し結果が`false`の場合、`nullptr`を返す。

put領域が�在する場合(ファイルを開いているなどして)、`overflow(traits::eof())`を呼び出してフラッシュする。

仮想メンバ関数`underflow`, `overflow`, `seekoff`,  `seekpos`のうち、最後に呼ばれたのが`overflow`の場合、`std::codecvt::unshift()`を呼び出し、再び`overflow(traits::eof())`を呼び出してフラッシュする。

最後にあたかも`fclose`を呼び出したかのように振る舞う。

上記に書いた`fclose`を含む関数呼び出しのいずれかで失敗があった場合、`nullptr`を返す。ただし例外が発生した場合は一度捕捉しファイルを閉じたあとに例外を投げ直す。

## 戻り値

成功したら`this`を返す。それ以外の場合は`nullptr`を返す

## 事後条件

この関数を呼び出したあとは、[`is_open`](is_open.md)の呼び出し結果は`close`が成功したか否かに関わらず`false`になる

## 例

```cpp example
#include <iostream>
#include <fstream>

int main()
{
  std::fstream fs();
  std::filebuf* buf = fs.rdbuf();

  if (buf->open("foo", std::ios_base::out)) {
      buf->close();
  }
}
```
* std::fstream[link /reference/fstream/basic_fstream.md]
* std::filebuf[link /reference/fstream/basic_filebuf.md]
* rdbuf()[link /reference/fstream/basic_fstream/rdbuf.md]
* open()[link /reference/fstream/basic_filebuf/open.md]
* close()[color ff0000]

## バージョン
### 言語
- C++98
