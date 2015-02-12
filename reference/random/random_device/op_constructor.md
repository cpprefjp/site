#コンストラクタ (C++11)
```cpp
explicit random_device(const string& token = implementation-defined);

random_device(const random_device&) = delete;
```
* string[link /reference/string/basic_string.md]
* implementation-defined[italic]

##`random_device`オブジェクトの構築
- `explicit random_device(const string& token = implementation-defined);`

トークンを受け取って乱数生成器を構築する。デフォルトのトークンパラメータは実装定義である。  
※実装は、このトークンパラメータによって、異なるランダムのソースを使用してもよい。  
  
例外 : 乱数生成器を初期化できなかった場合、[`exception`](/reference/exception/exception.md)から派生した実装定義の例外オブジェクトを送出する。


- `random_device(const random_device&) = delete;`

コピーコンストラクタ。コピー禁止。  
これによって、ムーブコンストラクタも自動生成されない。


##例
```cpp
#include <random>

int main()
{
  // デフォルト構築
  {
    std::random_device rd;
  }

  // トークン指定
  {
    // UNIX系OS上固有で、ランダムソースを/dev/randomにする
    std::random_device rd("/dev/random");
  }
}
```


###出力
```
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation.md#clang): ??
- [GCC](/implementation.md#gcc): 
- [GCC, C++0x mode](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp) ??


##参照


