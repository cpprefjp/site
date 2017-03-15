# rdbuf
* ios[meta header]
* std[meta namespace]
* basic_ios[meta class]
* function[meta id-type]

```cpp
basic_streambuf<CharT, Traits>* rdbuf() const;                                  // (1)

basic_streambuf<CharT, Traits>* rdbuf(basic_streambuf<CharT, Traits>* sb);      // (2)
```
* basic_streambuf[link ../../streambuf/basic_streambuf.md]

## 概要
ストリームバッファオブジェクトを取得・設定する。

## 効果
- (1) -
- (2) `*this` に紐づくストリームバッファ（[`basic_streambuf`](../../streambuf/basic_streambuf.md)）オブジェクトを引数 `sb` に設定する（`rdbuf() == sb` となる）。  
    その後、[`clear`](clear.md)`()` を実行する（結果として、`sb == nullptr`、かつ、`(`[`exceptions`](exceptions.md)`() &` [`ios_base`](../ios_base.md)`::`[`badbit`](../ios_base/type-iostate.md)`) != 0` の場合、[`ios_base`](../ios_base.md)`::`[`failure`](../ios_base/failure.md) 例外が送出される）。

## 戻り値
- (1) `*this` に紐づいているストリームバッファ（[`basic_streambuf`](../../streambuf/basic_streambuf.md)）オブジェクトへのポインタ
- (2) 引数 `sb` が設定される前の `rdbuf()`


## 例
```cpp
#include <iostream>
#include <sstream>

int main()
{
  std::cout << "1st message" << std::endl;
  std::ostringstream sstr;
  std::streambuf* buf = std::cout.rdbuf(sstr.rdbuf());
  std::cout << "2nd message" << std::endl;
  std::cout.rdbuf(buf);
  std::cout << "3rd message" << std::endl;
  std::cout << sstr.str();
}
```
* std::ostringstream[link ../../sstream/basic_ostringstream.md.nolink]
* std::streambuf[link ../../streambuf/basic_streambuf.md]
* rdbuf[color ff0000]
* str()[link ../../sstream/basic_ostringstream/str.md.nolink]

### 出力
```
1st message
3rd message
2nd message
```

## バージョン
### 言語
- C++98

## 参照
- [`set_rdbuf`](set_rdbuf.md)
