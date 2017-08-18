# random_device
* random[meta header]
* std[meta namespace]
* class template[meta id-type]
* cpp11[meta cpp]

```cpp
namespace std {
  class random_device;
}
```

## 概要
`random_device`クラスは、非決定論的な乱数生成エンジンである。予測不能な乱数を生成することから、擬似乱数生成エンジンのシード初期化や、暗号化といった用途に使用できる。

`random_device`の実装は処理系定義だが、Windows環境では[`CryptGenRandom()`](https://msdn.microsoft.com/en-us/library/windows/desktop/aa379942.aspx)関数のラッパーとして、UNIX系環境では[`/dev/random`](https://linuxjm.osdn.jp/html/LDP_man-pages/man4/random.4.html)や[`/dev/urandom`](https://linuxjm.osdn.jp/html/LDP_man-pages/man4/random.4.html)から値を読み取る形で定義される場合がある。
実装の制限によって予測不能な乱数生成器を定義できない場合、このクラスは**擬似乱数生成器で定義される可能性がある**ため、特にクロスプラットフォームなコードを書く場合は注意すること。

予測不能な乱数はソフトウェアでは実装できないため、これらはハードウェアのノイズやマウスの動きといった環境ノイズをエントロピープールとして乱数を生成する。
非決定論的な乱数生成器のパフォーマンスは擬似乱数生成器よりも悪く、特にエントロピープールが枯渇すると著しく悪化する。
再現性が必要なく、速度が遅くても問題ない状況で使用すること。

## 実装
- Windows
    - Visual C++: 外部デバイスを用いており、暗号学的に安全で非決定論的 ([`rand_s`](https://docs.microsoft.com/en-us/cpp/c-runtime-library/reference/rand-s))
    - Clang: 暗号論的な乱数である [`rand_s`](https://docs.microsoft.com/en-us/cpp/c-runtime-library/reference/rand-s) を使用する
    - GCC (MinGW): 擬似乱数生成器 [`mt19937`](mt19937.md) を用いるため**使用を推奨しない**。詳細は処理系の備考欄を参照
- UNIX 系
    - Clang (libc++): `/dev/urandom` (デフォルト) または `/dev/random` から値を読み取る
    - GCC (libstdc++): CPU の `RDRAND` 命令を使う (デフォルト) か、`/dev/urandom` (`RDRAND` が使用できないときのデフォルト) または `/dev/random` から値を読み取る


## メンバ関数
### 構築

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------------|----------------|-------|
| [`(constructor)`](random_device/op_constructor.md) | コンストラクタ | C++11 |
| `~random_device() = default;`                      | デストラクタ   | C++11 |
| `void operator=(const random_device& ) = delete;`  | 代入演算子。代入不可 | C++11 |


### 生成

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------|----------------|-------|
| [`operator()`](random_device/op_call.md) | 乱数を生成する | C++11 |


### エンジンの特性

| 名前 | 説明 | 対応バージョン |
|-----------------------------------------|------------------------|-------|
| [`entropy`](random_device/entropy.md) | エントロピーを取得する | C++11 |


## 静的メンバ関数
### 生成の特徴

| 名前 | 説明 | 対応バージョン |
|-----------------------------------------|------------------------|-------|
| [`min`](random_device/min.md) | 生成する範囲の最小値を取得する | C++11 |
| [`max`](random_device/max.md) | 生成する範囲の最大値を取得する | C++11 |


## メンバ型

| 型 | 説明 | 対応バージョン |
|---------------|-------------------|-------|
| `result_type` | 乱数生成結果の符号なし整数型 `unsigned int`。 | C++11 |


## 例
### 基本的な使い方
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
* std::random_device[color ff0000]
* rng()[link random_device/op_call.md]

#### 出力例
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


### パスワードを生成する
```cpp
#include <iostream>
#include <cassert>
#include <string>
#include <random>

// candidate_chars : パスワードに含める文字の集合
// length : パスワードの長さ
std::string create_password(const std::string& candidate_chars, std::size_t length)
{
  assert(!candidate_chars.empty());

  // 非決定論的な乱数生成器を使用する
  std::random_device engine;

  // パスワード候補となる文字集合の範囲を一様分布させる
  std::uniform_int_distribution<std::size_t> dist(0, candidate_chars.size() - 1);

  std::string password;
  for (std::size_t i = 0; i < length; ++i) {
    // パスワード候補の文字集合から、ランダムな一文字を選択する
    std::size_t random_index = dist(engine);
    char random_char = candidate_chars[random_index];

    // 選択した文字を、パスワード文字列に追加する
    password += random_char;
  }
  return password;
}

int main()
{
  std::string candidate_chars = "abcdefghijklmnopqrstuvwxyz";
  std::size_t length = 8;

  std::string password = create_password(candidate_chars, length);
  std::cout << password << std::endl;
}
```
* std::string[link /reference/string/basic_string.md]
* std::size_t[link /reference/cstddef/size_t.md]
* uniform_int_distribution[link uniform_int_distribution.md]
* candidate_chars.size()[link /reference/string/basic_string/size.md]
* dist(engine)[link uniform_int_distribution/op_call.md]
* password += random_char[link /reference/string/basic_string/op_plus_assign.md]
* std::cout[link /reference/iostream/cout.md]
* std::endl[link /reference/ostream/endl.md]
* assert[link /reference/cassert/assert.md]

#### 出力例
```
jyiasder
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang, C++11 mode](/implementation.md#clang): 3.2
- [GCC, C++11 mode](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 10.0, 11.0, 12.0, 14.0, 14.1


## 備考
- Windows版のGCC (MinGW, libstdc++) では、`random_device`クラスは擬似乱数生成器である[`mt19937`](mt19937.md)で実装されている。その環境のデフォルトでは固定の乱数列が生成されてしまうので注意すること。コンストラクタの引数としてシード値を文字列化して渡せば`mt19937`のシードとして扱われるが、非決定論的な乱数として振る舞わないことは変わらない。この環境では`random_device`の使用は推奨しない

### 代替
- クロスプラットフォーム
    - CPU が提供する [`RDRAND`, `RDSEED` 命令](https://www.cryptopp.com/wiki/RDRAND)
- Windows
    - [`rand_s`](https://docs.microsoft.com/en-us/cpp/c-runtime-library/reference/rand-s) (`CryptGenRandom` のラッパー)
    - [`RtlGenRandom`](https://msdn.microsoft.com/en-us/library/aa387694.aspx) 関数 (替わりに `CryptGenRandom` を使用することを推奨)
    - [`CryptGenRandom`](https://msdn.microsoft.com/en-us/library/aa379942.aspx) 関数

## 参照
- GCC: [Implementation Status 26.5.6 [rand.device]](https://gcc.gnu.org/onlinedocs/libstdc++/manual/status.html#iso.2011.specific)
- Microdoft Visual Studio 2017: [random\_device Class](https://docs.microsoft.com/en-us/cpp/standard-library/random-device-class)

- [/dev/random - Wikipedia](https://ja.wikipedia.org/wiki//dev/random)
- [Man page of RANDOM](https://linuxjm.osdn.jp/html/LDP_man-pages/man4/random.4.html)
- [CryptGenRandom function - MSDN](https://msdn.microsoft.com/en-us/library/windows/desktop/aa379942.aspx)
- [random_deviceの実装（再訪） - 煙人計画](http://vaporoid.hateblo.jp/entry/2014/07/25/154852)
- [Replacing `/dev/urandom` May 4, 2016 - Security](https://lwn.net/Articles/685371/)
- [gccをwindowsで使うならstd::random_deviceを使ってはいけない - Qiita](http://qiita.com/nanashi/items/f94b78398a6c79d939e1)

