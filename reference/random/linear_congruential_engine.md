#linear_congruential_engine
```cpp
namespace std
{
  template<class UIntType, UIntType a, UIntType c, UIntType m>
  class linear_congruential_engine
  {
  public:
    // types
    typedef UIntType result_type;
    // engine characteristics
    static constexpr result_type
    multiplier = a;
    static constexpr result_type
    increment = c;
    static constexpr result_type
    modulus = m;
    static constexpr result_type
    min() { return c == 0u ? 1u : 0u };
    static constexpr result_type
    max() { return m - 1u };
    static constexpr result_type
    default_seed = 1u;
    // constructors and seeding functions
    explicit linear_congruential_engine ( result_type s = default_seed );
    template<class Sseq> explicit linear_congruential_engine ( Sseq& q );
    void seed ( result_type s = default_seed );
    template<class Sseq> void seed ( Sseq& q );
    // generating functions
    result_type operator() ();
    void discard ( unsigned long long z );
  };
}
```
* // types[italic]
* // engine characteristics[italic]
* // constructors and seeding functions[italic]
* // generating functions[italic]

##概要

やや古い言語で標準的に用いられている事が多い単純な擬似乱数生成エンジンである。この擬似乱数生成エンジンは内部状態として前の擬似乱数と定数A、定数B、定数Mを保持し以下の漸化式により次の擬似乱数を生成する。
<img src='http://www.texify.com/img/%5CLARGE%5C%21x_%7Bn%2B1%7D%3D%5Cleft%28%20A%5Ctimes%20X_%7Bn%7D%2BB%29%20mod%20M.gif' border='0' alt='x_{n+1}=\left( A\times X_{n}+B) mod M'></img>

単純なだけあって<b>少メモリで高速</b>な擬似乱数生成エンジンだが、<b>線形関数は予測が容易</b>であり、また<b>単純な剰余により多次元に均等分布しない</b>、<b>下位ビットのランダム性が低い</b>、<b>周期が短い</b>などの擬似乱数として用途によっては深刻な問題の原因（バグ、予想外の欠陥的仕様）となりかねない。

C++11発行現在、一般的なPC向けの擬似乱数生成エンジンとしては非標準となりつつあり、余程非力な実行環境に於いて高速かつ短周期で構わない擬似乱数を使用したい場合を除き<b>積極的にこの擬似乱数生成エンジンを用いるべきではない</b>。（通常はC++11標準ライブラリにも含まれるメルセンヌツイスター、或いは余程擬似乱数生成エンジンの速度が要求される場合はXORSHIFTを用いると良い。）

なお、本クラスの諸テンプレートパラメーターを定義済みの minstd_rand0 、 minstd_rand も用意されており、それらで十分な場合にはより簡単に使用する事もできる。また、直接的には関係しないが、C言語の rand 、 srand により運用される擬似乱数も同様のアルゴリズムによるものである。


##例
次の例は線形合同法エンジンにより非常に質の悪い擬似乱数列を生成してしまう例である。出力からは人間が一見しただけでも擬似乱数として多くの場合に問題となり得る単純性に気がつくだろう。

```cpp
#include <random>
#include <iostream>
#include <limits>

int main(){
  std::linear_congruential_engine<uint64_t, 13579, 24680, 9876543210> rne(123456789);
  size_t n;
  std::cout
    << "how many generate?\n"
    << "(you don't input negative value or charactor if you are not understood)\n"
    << " input [0-" << std::numeric_limits<size_t>::max() << "] > ";
  std::cin >> n;
  while(n--)
    std::cout << rne() << std::endl;
}
```

###出力
```
/tmp% ./bad_random       
how many generate?
(you don't input negative value or charactor if you are not understood)
 input [0-18446744073709551615] > 16
7283960021
5189444899
8213048061
8930260889
9691647241
7816180179
2577340661
5116267369
2189689191
5394487169
7296847171
2406276969
3230048051
8970656809
5141425161
8004877619
```
* /tmp%[color ff0000]

## バージョン

###言語

- C++11


###処理系

- [Clang](/implementation#clang.md): 
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 
- [ICC](/implementation#icc.md): 
- [Visual C++](/implementation#visual_cpp.md): 
