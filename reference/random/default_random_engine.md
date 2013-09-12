#default_random_engine
```cpp
namespace std {
  typedef implementation-defined default_random_engine;
}
```
* implementation-defined[italic]

##概要
擬似乱数生成エンジンには、パフォーマンス、サイズ、品質といった、多くの特性による選択肢がある。  
しかし、非専門家がこれらを正しく使い分けるのは難しいだろう。  
`default_random_engine`は、非専門用途で十分な品質の擬似乱数生成エンジンを`typedef`したものである。


##備考
以下、確認できた環境ごとのエンジンである。バージョンによって変更される可能性があるため参考までに。

| ライブラリ         | エンジン                            |
|--------------------|-------------------------------------|
| Visual C++ 2012    | [`mt19937`](./mt19937.md)           |
| GCC 4.8(libstdc++) | [`minstd_rand0`](./minstd_rand0.md) |
| Clang 3.4(libc++)  | [`minstd_rand`](./minstd_rand.md)   |


##例
```cpp
#include <iostream>
#include <random>

int main()
{
  std::random_device seed_gen;
  std::default_random_engine engine(seed_gen());

  std::uniform_int_distribution<> dist(0, 3);

  for (int i = 0; i < 10; ++i) {
    int result = dist(engine);
    std::cout << result << std::endl;
  }
}
```

###出力例
```
1
3
3
2
0
1
0
2
0
3
```

