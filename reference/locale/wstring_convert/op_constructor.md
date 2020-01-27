# コンストラクタ
* locale[meta header]
* std[meta namespace]
* wstring_convert[meta class]
* function[meta id-type]
* cpp11[meta cpp]
* cpp17deprecated[meta cpp]

```cpp
wstring_convert(Codecvt* pcvt = new Codecvt);          // (1) C++11
explicit wstring_convert(Codecvt* pcvt = new Codecvt); // (1) C++14

wstring_convert(Codecvt* pcvt, state_type state);      // (2) C++11

wstring_convert(
    const byte_string& byte_err,
    const wide_string& wide_err = wide_string());      // (3) C++11
explicit wstring_convert(
    const byte_string& byte_err,
    const wide_string& wide_err = wide_string());      // (3) C++14

wstring_convert(const wstring_convert&) = delete;      // (4) C++14
```

このクラスはC++17から非推奨となった。

## 概要
- (1) : デフォルトコンストラクタ。
- (2) : コード変換機、および変換状態を受け取るコンストラクタ。
- (3) : 変換に失敗した際に返す文�列を受け取るコンストラクタ。
- (4) : コピーコンストラクタ。コピー不可。これによりムーブも不可。


## 要件
- (2) : `pcvt != nullptr`であること。


## 効果
- (1) : コード変換機のインスタンス`pcvt`をメンバ変数として保持し、[`from_bytes()`](from_bytes.md)および[`to_bytes()`](to_bytes.md)関数でのコード変換に使用する。
    - [`from_bytes()`](from_bytes.md)メンバ関数での変換失敗時に返されるワイド文�列は未�定となる。
    - [`to_bytes()`](to_bytes.md)メンバ関数での変換失敗時に返されるバイト文�列は未�定となる。
    - [`state()`](state.md)メンバ関数で返される状態は、初期状態となる。
- (2) : コード変換機のインスタンス`pcvt`をメンバ変数として保持し、[`from_bytes()`](from_bytes.md)および[`to_bytes()`](to_bytes.md)関数でのコード変換に使用する。[`state()`](state.md)メンバ関数で返される値として、パラメータ`state`を保持する。
    - [`from_bytes()`](from_bytes.md)メンバ関数での変換失敗時に返されるワイド文�列は未�定となる。
    - [`to_bytes()`](to_bytes.md)メンバ関数での変換失敗時に返されるバイト文�列は未�定となる。
- (3) : [`to_bytes()`](to_bytes.md)メンバ関数での変換失敗時に`byte_err`が返されるようになり、[`from_bytes()`](from_bytes.md)メンバ関数での変換失敗時に`wide_err`が返されるようになる。
    - 式`new Codecvt`で生成したコード変換機のインスタンスを、メンバ変数として保持する。
    - [`state()`](state.md)メンバ関数で返される状態は、初期状態となる。


## 例
```cpp example
#include <iostream>
#include <string>
#include <locale>
#include <codecvt>

int main()
{
  using cvt_t = std::codecvt_utf8<char32_t>;
  using converter_t = std::wstring_convert<cvt_t, char32_t>;
    
  // (1)
  // デフォルトコンストラクタ
  converter_t converter1;
    
  // (2)
  // コード変換機のインスタンス、および変換状態を受け取るコンストラクタ
  std::mbstate_t state;
  converter_t converter2(new cvt_t(), state);
    
  // (3)
  // 変換失敗時に返す文�列を受け取るコンストラクタ
  converter_t converter3(u8"convert error", U"convert error");
}
```
* std::codecvt_utf8[link /reference/codecvt/codecvt_utf8.md]
* std::mbstate_t[link /reference/cwchar/mbstate_t.md.nolink]

### 出力
```
```


## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.0, 3.1, 3.2, 3.3, 3.4
- [GCC](/implementation.md#gcc): 5.1
- [ICC](/implementation.md#icc):
- [Visual C++](/implementation.md#visual_cpp): 2010, 2012, 2013


## 参照
- [LWG Issue 2175. `wstring_convert` and `wbuffer_convert` validity](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2176)
- [LWG Issue 2176. Special members for `wstring_convert` and `wbuffer_convert`](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#2176)

