#stdexcept
* stdexcept[meta header]

`<stdexcept>`ヘッダは、標準的な例外クラスを提供する。  
これらの例外クラスは、標準ライブラリ内でも使用されている。

これらのクラス群に反映されているエラーモデルでは、エラーは「実行時エラー (runtime error) 」と「論理エラー (logic error) 」との２つに大別される。  
論理エラーを区別するための性質は、それがプログラムの内部的論理の誤りに起因することである。理論的には、それらは予め避けることができる。  
対して、実行時エラーはプログラムの制御の及ばない事象に起因する。それらを前もって簡単に予見することはできない。

このヘッダで提供される例外クラスは以下の表の通りである。以下のクラスは全て、`std`名前空間で提供される。


| 名前 | 説明 | 対応バージョン |
|--------------------|--------------------------------------------|-------|
| `logic_error`      | プログラムの実行前に検出可能なエラー（論理エラー）を示す | |
| `domain_error`     | 定義域エラーを示す | |
| `invalid_argument` | 不正な引数を示す | |
| `length_error`     | 長すぎるオブジェクトを作ろうとしたことを示す | |
| `out_of_range`     | 引数が許容範囲外であることを示す | |
| `runtime_error`    | プログラム実行時にのみ検出可能なエラー（実行時エラー）を示す | |
| `range_error`      | 内部計算によって、値が範囲外になったことを示す（値域エラー） | |
| `overflow_error`   | 数値計算の結果がオーバーフローしたことを示す | |
| `underflow_error`  | 数値計算の結果がアンダーフローしたことを示す | |

例外クラスには継承関係があり、以下の箇条書きの階層構造で示す。

- [`exception`](/reference/exception/exception.md)
	- `logic_error`
		- `domain_error`
		- `invalid_argument`
		- `length_error`
		- `out_of_range`
	- `runtime_error`
		- `range_error`
		- `overflow_error`
		- `underflow_error`

[`exception`](/reference/exception/exception.md)クラスを除く9つのクラスは、すべて同じ`public`メンバ関数をもつ。 

クラス名を`T`とすると、以下の`public`メンバ関数をもつ。

##メンバ関数

| 名前 | 説明 | 対応バージョン |
|--------------------|--------------------------------------------|-------|
| `explicit T(const` [`string`](/reference/string/basic_string.md)`& what_arg);` | 指定したメッセージを持つ例外オブジェクトを生成する | |
| `explicit T(const char* what_arg);` | 指定したメッセージを持つ例外オブジェクトを生成する | C++11 |
| `virtual const char* what() const noexcept;` | メッセージを取得する | |


##例
ここでは、簡単な例外処理の例を示す。

```cpp
#include <stdexcept>
#include <iostream>
#include <cstdlib>

void f()
{
  // 例外を投げる
  throw std::logic_error("an exception occurred");
}

int main()
{
  try {
    f();
  }
  catch (const std::logic_error& e) {
    // 例外が発生した！
    std::cout << e.what() << std::endl;
    std::exit(1);
  }
}
```
* std::logic_error[color ff0000]
* std::exit[link /reference/cstdlib/exit.md]

##参照
- [LWG Issue 254. Exception types in clause 19 are constructed from `std::string`](http://www.open-std.org/jtc1/sc22/wg21/docs/lwg-defects.html#254)
    - C++11から例外送出の理由として、文字配列を受け取ることを許可した経緯のレポート

