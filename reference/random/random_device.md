#random_device (C++11)
```cpp
namespace std {
  class random_device;
}
```

##概要
`random_device`クラスは、非決定的な乱数生成エンジンである。予測不能な乱数を生成することから、擬似乱数生成エンジンのシード初期化や、暗号化といった用途に使用できる。

`random_device`の実装は処理系定義だが、Windows環境では[`CryptGenRandom()`](http://msdn.microsoft.com/en-us/library/windows/desktop/aa379942.aspx)関数のラッパーとして、UNIX系環境では[`/dev/random`](http://linuxjm.sourceforge.jp/html/LDP_man-pages/man4/random.4.html)や[`/dev/urandom`](http://linuxjm.sourceforge.jp/html/LDP_man-pages/man4/random.4.html)から値を読み取る形で定義される場合がある。

予測不能な乱数はソフトウェアでは実装できないため、これらはハードウェアのノイズやマウスの動きといったものから乱数を生成する。

実装の制限によって予測不能な乱数生成器を定義できない場合、このクラスは擬似乱数生成器で定義される可能性がある。


##メンバ関数
###構築

| 名前 | 説明 | 対応バージョン |
|-------------------------------------------------------|----------------------|-------|
| [`(constructor)`](./random_device/random_device.md)   | コンストラクタ       | C++11 |
| `~random_device() = default;`                         | デストラクタ         | C++11 |
| `void operator()(const random_device&) = delete;`     | 代入演算子。代入不可 | C++11 |


###生成

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------|----------------|-------|
| [`operator()`](./random_device/op_call.md) | 乱数を生成する | C++11 |


###エンジンの特性

| 名前 | 説明 | 対応バージョン |
|-----------------------------------------|------------------------|-------|
| [`entropy`](./random_device/entropy.md) | エントロピーを取得する | C++11 |


##静的メンバ関数
###生成の特徴

| 名前 | 説明 | 対応バージョン |
|-----------------------------------------|------------------------|-------|
| [`min`](./random_device/min.md) | 生成する範囲の最小値を取得する | C++11 |
| [`max`](./random_device/max.md) | 生成する範囲の最大値を取得する | C++11 |


##メンバ型

| 型 | 説明 | 対応バージョン |
|---------------|-------------------|-------|
| `result_type` | 乱数生成結果の符号なし整数型 `unsigned int`。 | C++11 |


##例
```cpp
#include <iostream>
#include <random>

int main()
{
  std::random_device rng;

  for (int i = 0; i < 10; ++i) {
    // 予測不能な乱数を生成する
    unsigned int result = rng();

    std::cout << result << std::endl;
  }
}
```

###出力例
```
770203506
3783995753
458506084
4033712415
4182902552
940753559
327526966
3226755811
4026482080
1445600541
```

##バージョン
###言語
- C++11

###処理系
- [Clang](/implementation#clang.md): ??
- [GCC](/implementation#gcc.md): 
- [GCC, C++0x mode](/implementation#gcc.md): 4.7.2
- [ICC](/implementation#icc.md): ??
- [Visual C++](/implementation#visual_cpp.md): ??

##参照
* [dev/random - Wikipedia](http://ja.wikipedia.org/wiki//dev/random)
* [Man page of RANDOM](http://linuxjm.sourceforge.jp/html/LDP_man-pages/man4/random.4.html)
* [CryptoGenRandom function - MSDN](http://msdn.microsoft.com/en-us/library/windows/desktop/aa379942.aspx)
* [random_deviceの実装（再訪） - 煙人計画](http://vaporoid.hateblo.jp/entry/2014/07/25/154852)

