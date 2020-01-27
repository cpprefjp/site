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

`random_device`の実装は処理系定義だが、Windows環境では[`CryptGenRandom()`](https://docs.microsoft.com/ja-jp/windows/win32/api/wincrypt/nf-wincrypt-cryptgenrandom)関数のラッパーとして、UNIX系環境では[`/dev/random`](https://linuxjm.osdn.jp/html/LDP_man-pages/man4/random.4.html)や[`/dev/urandom`](https://linuxjm.osdn.jp/html/LDP_man-pages/man4/random.4.html)から値を�み取る形で定義される場合がある。
実装の制限によって予測不能な乱数生成器を定義できない場合、このクラスは**擬似乱数生成器で定義される可能性がある**ため、特にク�スプラットフォームなコードを書く場合は注意すること。

予測不能な乱数はソフトウェアでは実装できないため、これらはハードウェアのノイズやマウスの動きといった環境ノイズをエント�ピープールとして乱数を生成する。
非決定論的な乱数生成器のパフォーマンスは擬似乱数生成器よりも悪く、特にエント�ピープールが枯渇すると著しく悪化する。
再現性が必要なく、速度が遅くても問題ない状況で使用すること。

## 実装
- Windows
    - Visual C++: 外部デバイスを用いており、暗号�的に安全で非決定論的 ([`rand_s`](https://docs.microsoft.com/en-us/cpp/c-runtime-library/reference/rand-s))
    - Clang: 暗号論的な乱数である [`rand_s`](https://docs.microsoft.com/en-us/cpp/c-runtime-library/reference/rand-s) を使用する
    - GCC (MinGW): GCC 9.1までは擬似乱数生成器 [`mt19937`](mt19937.md) を用いるため**使用を推奨しない**。詳細は備考欄を参照。GCC 9.2からは暗号論的な乱数である [`rand_s`](https://docs.microsoft.com/en-us/cpp/c-runtime-library/reference/rand-s) を使用する。
- UNIX 系
    - Clang (libc++): `/dev/urandom` (デフォルト) または `/dev/random` から値を�み取る
    - GCC (libstdc++): CPU の `RDRAND` 命令を使う (デフォルト) か、`/dev/urandom` (`RDRAND` が使用できないときのデフォルト) または `/dev/random` から値を�み取る


## メンバ関数
### 構築

| 名前 | 説明 | 対応バージョン |
|----------------------------------------------------|----------------|-------|
| [`(constructor)`](random_device/op_constructor.md) | コンストラクタ | C++11 |
| `~random_device() = default;`                      | デストラクタ   | C++11 |
| `void operator=(const random_device& ) = delete;`  | 代入演算�。代入不可 | C++11 |


### 生成

| 名前 | 説明 | 対応バージョン |
|--------------------------------------------|----------------|-------|
| [`operator()`](random_device/op_call.md) | 乱数を生成する | C++11 |


### エンジンの特性

| 名前 | 説明 | 対応バージョン |
|-----------------------------------------|------------------------|-------|
| [`entropy`](random_device/entropy.md) | エント�ピーを取得する | C++11 |


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
```cpp example
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
```cpp example
#include <iostream>
#include <cassert>
#include <string>
#include <random>

// candidate_chars : パスワードに含める文�の集合
// length : パスワードの長さ
std::string create_password(const std::string& candidate_chars, std::size_t length)
{
  assert(!candidate_chars.empty());

  // 非決定論的な乱数生成器を使用する
  std::random_device engine;

  // パスワード候補となる文�集合の範囲を一様分布させる
  std::uniform_int_distribution<std::size_t> dist(0, candidate_chars.size() - 1);

  std::string password;
  for (std::size_t i = 0; i < length; ++i) {
    // パスワード候補の文�集合から、ランダムな一文�を選択する
    std::size_t random_index = dist(engine);
    char random_char = candidate_chars[random_index];

    // 選択した文�を、パスワード文�列に追加する
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
* uniform_int_distribution[link uniform_int_distribution.md]
* candidate_chars.size()[link /reference/string/basic_string/size.md]
* dist(engine)[link uniform_int_distribution/op_call.md]
* password += random_char[link /reference/string/basic_string/op_plus_assign.md]

#### 出力例
```
jyiasder
```

## バージョン
### 言語
- C++11

### 処理系
- [Clang](/implementation.md#clang): 3.2
- [GCC](/implementation.md#gcc): 4.7.2
- [ICC](/implementation.md#icc): ??
- [Visual C++](/implementation.md#visual_cpp): 2010, 2012, 2013, 2015, 2017


## 備考
### MinGW GCC(libstdc++)

Windows版のGCC (MinGW, libstdc++) 9.1まででは、`random_device`クラスは擬似乱数生成器である[`mt19937`](mt19937.md)で実装されている。その環境のデフォルトでは固定の乱数列が生成されてしまうので注意すること。コンストラクタの引数としてシード値を文�列化して渡せば`mt19937`のシードとして扱われるが、非決定論的な乱数として振る舞わないことは変わらない。この環境では`random_device`の使用は推奨しない

GCC (MinGW, libstdc++) 9.2からは、この問題は解決されている。[PR libstdc++/85494 use rdseed and rand_s in std::random_device](https://gcc.gnu.org/git/?p=gcc.git;a=commit;h=91df033fd775060adde6f78fd4a0a7d744032910)により、暗号�的に安全で非決定論的な乱数を生成する`rand_s`関数での実装になるためである。

##### 代替
- ク�スプラットフォーム
    - CPU が提供する [`RDRAND`, `RDSEED` 命令](https://www.cryptopp.com/wiki/RDRAND)
- Windows
    - [`rand_s`](https://docs.microsoft.com/en-us/cpp/c-runtime-library/reference/rand-s) (`CryptGenRandom` のラッパー)
    - [`RtlGenRandom`](https://docs.microsoft.com/ja-jp/windows/win32/api/ntsecapi/nf-ntsecapi-rtlgenrandom) 関数 (替わりに `CryptGenRandom` を使用することを推奨)
    - [`CryptGenRandom`](https://docs.microsoft.com/ja-jp/windows/win32/api/wincrypt/nf-wincrypt-cryptgenrandom) 関数(Windows XP/Windows Server 2003以降。非推奨)
    - [`BCryptGenRandom`](https://docs.microsoft.com/ja-jp/windows/win32/api/bcrypt/nf-bcrypt-bcryptgenrandom) 関数(Windows Vista/Windows Server 2008以降)

##### Workaround

ワークアラウンドとして次のコードが利用できる。`rand_s`ではなく`CryptGenRandom`を用いているのは、`rand_s`を利用するには`Windows.h`をincludeする前に`_CRT_RAND_S`のdefineが必要でworkaroundには向かないため。また`BCryptGenRandom`を用いていないのは、対象としている環境では`CryptGenRandom`は利用可能であり、`BCryptGenRandom`より使える環境が広いためである。

```cpp
//! @file random_device.hpp
#pragma once

#include <random>

#if defined(__MINGW32__) && defined(__GNUC__) && !defined(__clang__) && (__GNUC__ < 9 || (__GNUC__ == 9 && __GNUC_MINOR__ <2))

#include <system_error>
#include <limits>
#include <string>
#include <Windows.h>
#include <wincrypt.h>

namespace workaround_mingw_gcc {
class random_device {
private:
  class crypt_context {
  private:
    HCRYPTPROV prov_;
  public:
    crypt_context(DWORD prov_type, LPCTSTR container = nullptr, LPCTSTR provider = nullptr, DWORD flags = 0) {
      const auto success = ::CryptAcquireContext(&this->prov_, container, provider, prov_type, flags);
      if (!success) {
        throw std::system_error(
          std::error_code(::GetLastError(), std::system_category()),
          "CryptAcquireContext:(" + std::to_string(success) + ')'
        );
      }
    }
    crypt_context(const crypt_context&) = delete;
    void operator=(const crypt_context&) = delete;
    ~crypt_context() noexcept {
      ::CryptReleaseContext(this->prov_, 0);
    }
    //HCRYPTPROV& get() noexcept { return this->prov_; }
    const HCRYPTPROV& get() const noexcept { return this->prov_; }
  };
  crypt_context prov_;

public:
  using result_type = unsigned int;
  explicit random_device(const std::string& /*token*/ = "workaround_mingw_gcc ")
  : prov_(PROV_RSA_FULL)
  {}
  random_device(const random_device&) = delete;
  void operator=(const random_device&) = delete;
  //~random_device() = default;
  double entropy() const noexcept { return 0.0; }
  result_type operator()() {
    result_type re;
    const auto success = ::CryptGenRandom(this->prov_.get(), sizeof(re), reinterpret_cast<BYTE*>(&re));
    if (!success) {
      throw std::system_error(
        std::error_code(::GetLastError(), std::system_category()),
        "CryptGenRandom:(" + std::to_string(success) + ')'
      );
    }
    return re;
  }
  static constexpr result_type min() { return std::numeric_limits<result_type>::min(); }
  static constexpr result_type max() { return std::numeric_limits<result_type>::max(); }
};
} // namespace workaround_mingw_gcc

namespace cpprefjp {
using workaround_mingw_gcc::random_device;
}

#else //defined(__MINGW32__) && defined(__GNUC__) && !defined(__clang__)

namespace cpprefjp {
using std::random_device;
}

#endif //defined(__MINGW32__) && defined(__GNUC__) && !defined(__clang__)
```
* HCRYPTPROV[link https://docs.microsoft.com/ja-jp/windows/win32/seccrypto/hcryptprov]
* BYTE[link https://docs.microsoft.com/ja-jp/windows/win32/winprog/windows-data-types#BYTE]
* DWORD[link https://docs.microsoft.com/ja-jp/windows/win32/winprog/windows-data-types#DWORD]
* LPCTSTR[link https://docs.microsoft.com/ja-jp/windows/win32/winprog/windows-data-types#LPCTSTR]
* PROV_RSA_FULL[link https://docs.microsoft.com/ja-jp/windows/win32/seccrypto/prov-rsa-full]
* <wincrypt.h>[link https://docs.microsoft.com/en-us/previous-versions/ms867086(v=msdn.10)]
* CryptAcquireContext[link https://docs.microsoft.com/ja-jp/windows/win32/api/wincrypt/nf-wincrypt-cryptacquirecontexta]
* GetLastError[link https://docs.microsoft.com/ja-jp/windows/win32/api/errhandlingapi/nf-errhandlingapi-getlasterror]
* CryptReleaseContext[link https://docs.microsoft.com/ja-jp/windows/win32/api/wincrypt/nf-wincrypt-cryptreleasecontext]
* CryptGenRandom[link https://docs.microsoft.com/ja-jp/windows/win32/api/wincrypt/nf-wincrypt-cryptgenrandom]
* std::system_category[link /reference/system_error/system_category.md]
* std::system_error[link /reference/system_error/system_error.md]
* std::error_code[link /reference/system_error/error_code.md]
* std::to_string[link /reference/string/to_string.md]

使用例は次の通り。上記コードを`random_device.hpp`というファイル名で保�していると仮定する。`cpprefjp::random_device`が`std::random_device`のworkaroundで、C++11標準規格の要求を満たしたクラス。

```cpp
#include "random_device.hpp"
#include <iostream>
#include <array>
#include <functional>
#include <algorithm>
using seed_v_t = std::array<cpprefjp::random_device::result_type, sizeof(std::mt19937)/sizeof(cpprefjp::random_device::result_type)>;
seed_v_t create_seed_v()
{
  cpprefjp::random_device rnd;
  seed_v_t sed_v;
  std::generate(sed_v.begin(), sed_v.end(), std::ref(rnd));
  return sed_v;
}
std::mt19937 create_random_engine()
{
  const auto sed_v = create_seed_v();
  std::seed_seq seq(sed_v.begin(), sed_v.end());
  return std::mt19937(seq);
}
std::mt19937& random_engine()
{
  static thread_local std::mt19937 engine = create_random_engine();
  return engine;
}
int main()
{
  std::mt19937& engine = random_engine();
  std::uniform_int_distribution<int> dist(1, 32);
  for(int i = 0; i < 10; ++i) std::cout << dist(engine) << std::endl;
}
```
* std::generate[link /reference/algorithm/generate.md]
* std::ref[link /reference/functional/ref.md]
* std::seed_seq[link /reference/random/seed_seq.md]
* std::mt19937[link /reference/random/mt19937.md]
* std::uniform_int_distribution[link /reference/random/uniform_int_distribution.md]
* dist(engine)[link /reference/random/uniform_int_distribution/op_call.md]
* sed_v.begin()[link /reference/array/array/begin.md]
* sed_v.end()[link /reference/array/array/end.md]

## 参照
- GCC: [Implementation Status 26.5.6 [rand.device]](https://gcc.gnu.org/onlinedocs/libstdc++/manual/status.html#iso.2011.specific)
- Microdoft Visual Studio 2017: [random\_device Class](https://docs.microsoft.com/en-us/cpp/standard-library/random-device-class)
- [/dev/random - Wikipedia](https://ja.wikipedia.org/wiki//dev/random)
- [Man page of RANDOM](https://linuxjm.osdn.jp/html/LDP_man-pages/man4/random.4.html)
- [CryptGenRandom function (wincrypt.h) - Win32 apps | Microsoft Docs](https://docs.microsoft.com/ja-jp/windows/win32/api/wincrypt/nf-wincrypt-cryptgenrandom)
- [random_deviceの実装（再訪） - 煙人計画](http://vaporoid.hateblo.jp/entry/2014/07/25/154852)
- [Replacing `/dev/urandom` May 4, 2016 - Security](https://lwn.net/Articles/685371/)
- [gccをwindowsで使うならstd::random_deviceを使ってはいけない - Qiita](http://qiita.com/nanashi/items/f94b78398a6c79d939e1)
- [MSC30-C. 疑似乱数の生成に rand() 関数を使用しない](https://www.jpcert.or.jp/sc-rules/c-msc30-c.html)
- `CryptGenRandom`のエント�ピー源(2005年時点): [Cryptographically Secure Random number on Windows without using CryptoAPI – Michael Howard's Web Log](https://blogs.msdn.microsoft.com/michael_howard/2005/01/14/cryptographically-secure-random-number-on-windows-without-using-cryptoapi/#div-comment-5543)

