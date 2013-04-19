#operator=
```cpp
basic_string& operator=(const basic_string& str);
basic_string& operator=(basic_string&& str) noexcept; // since C++11
basic_string& operator=(const charT* s);
basic_string& operator=(charT c);
basic_string& operator=(initializer_list<charT> il); // since C++11
```
* initializer_list[link /reference/initializer_list.md]

##概要

- `basic_string& operator=(const basic_string& str);``str` を `*this` へコピーする。`*this` と `str` が同一オブジェクトである場合は何も行わない。
- `basic_string& operator=(basic_string&& str) noexcept;``str` から `*this` へデータの所有権を移動する。`*this` と `str` が同一オブジェクトである場合は何も行わない。
- `basic_string& operator=(const charT* s);``*this = basic_string(s);` と等価。
- `basic_string& operator=(charT c);``*this = basic_string(1, c);` と等価。
- `basic_string& operator=([initializer_list](/reference/initializer_list.md)<charT> il);``*this = basic_string(il);` と等価。



##要件




##効果

コピーを行った場合と、ムーブ代入を行った場合で効果が異なる


| | | |
|---------------------------------------------------------------------------------------------------------------------|------------------------------------------------------------------------------------------------------------------------------|-----------------------------------------------------------------------------------------------------------------------------|
| メンバ関数 | コピーの場合 |ムーブ代入の場合  |
| `data()` | `str.data()` をコピーした領域の先頭ポインタ | `str.data()` |
| [`size()`](/reference/string/basic_string/size.md) | `str.[size()](/reference/string/basic_string/size.md)` と同じ値 | `str.[size()](/reference/string/basic_string/size.md)`と同じ値 |
| [`capacity()`](/reference/string/basic_string/capacity.md) | [`size()`](/reference/string/basic_string/size.md) 以上の値 | [`size()`](/reference/string/basic_string/size.md) 以上の値 |



##事後条件



##戻り値

いずれの場合も `*this` を返す。


##例外

ムーブ代入の場合は例外不送出。


##計算量



##備考



##例

```cpp
```

###出力

```cpp
##参照
```
