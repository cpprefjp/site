# コンストラクタ
* random[meta header]
* std[meta namespace]
* random_device[meta class]
* function[meta id-type]
* cpp11[meta cpp]

```cpp
explicit random_device(const string& token = implementation-defined); // (1)

random_device(const random_device&) = delete;                         // (2)
```
* string[link /reference/string/basic_string.md]

## 概要
- (1) : トークンを受け取って乱数生成器を構築する。デフォルトのトークンパラメータは実装定義である。
    - ※実装は、このトークンパラメータによって、異なるランダムのソースを使用してもよい。
- (2) : コピーコンストラクタ。コピー禁止。
    - これによって、ムーブコンストラクタも自動生成されない。


## 例外
- (1) : 乱数生成器を初期化できなかった場合、[`exception`](/reference/exception/exception.md)から派生した実装定義の例外オブジェクトを送出する


## 例
```cpp
#include <random>

int main()
{
  // (1) デフォルト構築
  {
    std::random_device rd;
  }

  // (1) トークン指定
  {
    // UNIX系OS上固有で、ランダムソースを/dev/randomにする
    std::random_device rd("/dev/random");
  }
}
```


### 出力
```
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 10.0, 11.0, 12.0, 14.0, 14.1
    - 14.1までにおいて、仮引数`token`の値が使用されることは無く、何を指定しても同じ結果となる。


## 参照


