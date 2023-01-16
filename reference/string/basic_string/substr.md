# substr
* string[meta header]
* std[meta namespace]
* basic_string[meta class]
* function[meta id-type]

```cpp
basic_string
  substr(size_type pos = 0,
         size_type n = npos) const; // (1) C++03
constexpr basic_string
  substr(size_type pos = 0,
         size_type n = npos) const; // (1) C++20
constexpr basic_string
  substr(size_type pos = 0,
         size_type n = npos) const &; // (1) C++23

constexpr basic_string
  substr(size_type pos = 0,
         size_type n = npos) &&; // (2) C++23
```

## 概要
部分文字列を取得する。
`pos`番目から`n`要素の文字列を返す。
引数省略時は、先頭位置（`0`番目）から全要素（`npos`）の文字列を返す。


## 要件
`pos <=` [`size()`](size.md)


## 戻り値(C++20まで)
`n`と[`size()`](size.md) `- pos`のうち、小さい方をコピーする長さ`rlen`として、

`basic_string(`[`data()`](data.md)`+pos, rlen)`

を返す。パラメータ`n`のデフォルト引数である`npos`の場合には、`pos`番目以降の全体を返す。


## 効果(C++23から)
- (1) 次と等価 : `return` [`basic_string`](op_constructor.md)`(*this, pos, n);`
- (2) 次と等価 : `return` [`basic_string`](op_constructor.md)`(std::move(*this), pos, n);`


## 例外
`pos >` [`size()`](size.md)の場合、[`out_of_range`](/reference/stdexcept.md)例外を送出する。


## 備考
C++23から(2)[右辺値修飾オーバーロード](/lang/cpp11/ref_qualifier_for_this)の追加にともない、従来からある(1)はconst左辺値参照オーバーロードに変更される。
同時にメンバ関数`substr`のライブラリ仕様記述は、新たに追加された`basic_string`コンストラクタを用いて書き直されるものの、基本的な動作はC++20までと同一である。


## 例
```cpp example
#include <iostream>
#include <string>

int main()
{
  const std::string s = "hello";

  // 2番目から3要素だけ抜き出した部分文字列を取得する
  {
    std::string result = s.substr(2, 3);
    std::cout << result << std::endl;
  }

  // 2番目以降の全体からなる部分文字列を取得する
  {
    std::string result = s.substr(2);
    std::cout << result << std::endl;
  }
}
```
* substr[color ff0000]

### 出力
```
llo
llo
```

## 参照
- [P0980R1 Making `std::string` constexpr](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2019/p0980r1.pdf)
- [P2438R2 `std::string::substr() &&`](https://www.open-std.org/jtc1/sc22/wg21/docs/papers/2022/p2438r2.html)
    - C++23での(2)右辺値修飾オーバーロード追加
